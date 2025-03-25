import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!
      }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.role !== "INSTRUCTOR") {
      return NextResponse.json(
        { error: "You are not authorized to create a course" },
        { status: 403 }
      );
    }

    const {
      courseCode,
      courseName,
      description,
      department,
      level,
      status = "PLANNED",
      coverImage,
      maximumStudents,
      enrollmentType,
      prerequisites,
      startDate,
      endDate,
      classTimings = [],
      materials = {}
    } = await req.json();

    // Validate required fields
    if (!courseCode || !courseName || !description || !department || !level) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate dates
    if (!startDate || !endDate || new Date(startDate) >= new Date(endDate)) {
      return NextResponse.json(
        { error: "Invalid start or end date" },
        { status: 400 }
      );
    }

    const instructorId = user.id;

    // Create transaction for course and related data
    const result = await prisma.$transaction(async (prisma) => {
      // Create the course
      const course = await prisma.course.create({
        data: {
          courseCode,
          courseName,
          description,
          department,
          level,
          status,
          coverImage,
          maximumStudents: Number(maximumStudents) || 30,
          enrollmentType: enrollmentType || "open",
          prerequisites,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          instructorId
        }
      });

      // Create class timings if provided
      if (Array.isArray(classTimings) && classTimings.length > 0) {
        await Promise.all(
          classTimings.map((timing) =>
            prisma.classTiming.create({
              data: {
                day: timing.day,
                startTime: new Date(`1970-01-01T${timing.startTime}:00`),
                endTime: new Date(`1970-01-01T${timing.endTime}:00`),
                roomNumber: timing.roomNumber || null,
                courseId: course.id
              }
            })
          )
        );
      }

      // Create study materials if provided
      if (materials && (materials.requiredTextBooks || materials.additionalResources)) {
        await prisma.studyMaterial.create({
          data: {
            title: `${courseName} Materials`,
            description: materials.description || "",
            requiredTextBooks: materials.requiredTextBooks || "",
            additionalResources: materials.additionalResources || "",
            courseId: course.id
          }
        });
      }

      return course;
    });

    return NextResponse.json(
      { 
        message: "Course created successfully",
        courseId: result.id 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating course:", error);

    // Handle Prisma unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Course code already exists" },
        { status: 409 }
      );
    }

    // Handle invalid date format
    if (error.message.includes("Invalid date") || error.message.includes("premature end of input")) {
      return NextResponse.json(
        { error: "Invalid date format. Please use ISO-8601 format (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create course", details: error.message },
      { status: 500 }
    );
  }
}