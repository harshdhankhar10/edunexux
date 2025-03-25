import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      courseId,
      description,
      academicTerm,
      credits,
      objectives,
      weeks,
      sections
    } = await req.json();

    const syllabus = await prisma.syllabus.create({
      data: {
        courseId,
        description,
        academicTerm,
        credits: parseInt(credits),
        includeGradingPolicy: sections.grading,
        includeAttendancePolicy: sections.attendance,
        includeMaterials: sections.materials,
        includeAcademicPolicies: sections.policies,
        objectives: {
          create: objectives.map((obj: any, index: number) => ({
            description: obj.description,
            order: index
          }))
        },
        weeks: {
          create: weeks.map((week: any, index: number) => ({
            weekNumber: week.weekNumber,
            title: week.title,
            content: week.content,
            readings: week.readings,
            assignments: week.assignments,
            order: index
          }))
        }
      },
      include: {
        objectives: true,
        weeks: true
      }
    });

    return NextResponse.json({message: 'Syllabus created Successfully'}, {status: 201});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}