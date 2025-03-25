import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function POST(req:Request){
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const {title, assignmentType, dueDate,dueTime,  totalPoints, description, courseId} = await req.json();

        const assignment = await prisma.assignment.create({
            data: {
                title,
                assignmentType,
                dueDate,
                dueTime,
                totalPoints,
                description,
                course: {
                    connect: {
                        id: courseId
                    }
                }
            }
        });

        return NextResponse.json({message: "Assignment created successfully"}, {status: 201});


    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}