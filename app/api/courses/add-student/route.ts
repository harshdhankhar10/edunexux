import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";


export async function POST(req:Request){
    try {
        const session = await getServerSession(NEXT_AUTH);
        const { courseId, studentId } = await req.json();

        if (!session) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }

        const course = await prisma.course.findUnique({
            where: {
                id: courseId
            }
        });

        if (!course) {
            return NextResponse.json({error: 'Course not found'}, {status: 404});
        }

        const student = await prisma.user.findUnique({
            where: {
                id: studentId
            }
        });

        if (!student) {
            return NextResponse.json({error: 'Student not found'}, {status: 404});
        }

        const enrollment = await prisma.courseEnrollment.findFirst({
            where: {
                courseId,
                userId: studentId
            }
        });

        if (enrollment) {
            return NextResponse.json({error: 'Student already enrolled in this course'}, {status: 400});
        }


        await prisma.courseEnrollment.create({
            data: {
                courseId,
                userId: studentId
            }
        });

        return NextResponse.json({message: 'Student added to course'}, {status: 201});
        
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}