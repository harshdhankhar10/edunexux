import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth"; 

export async function POST(req:NextResponse){
    try {
        const session = await getServerSession();
        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email!
            }
        });

        if(!user) return NextResponse.json({error: "User not found"}, {status: 404});

        if(user.role !== "INSTRUCTOR") return NextResponse.json({error: "You are not authorized to create a course"}, {status: 403});

        const {courseCode, courseName, description, department,level, status, coverImage, maximumStudents, 
            enrollmentType, prerequisites, startDate, endDate, classTimings, materials
                 } = await req.json();

         const instructorId = user.id;

        await prisma.course.create({
            data: {
                courseCode, courseName, description, department,level, status, coverImage, maximumStudents, 
                enrollmentType, prerequisites, startDate, endDate, classTimings, materials,
                instructorId
            }
        });




        return NextResponse.json({message: "Your Course has been created successfully"}, {status: 201});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}