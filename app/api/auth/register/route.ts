import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body || !body.email || !body.firstName || !body.lastName || !body.role || !body.password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const { email, firstName, lastName, role, password, student } = body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                role,
                password: hashedPassword,
                student: student
                    ? {
                          create: {
                              gradeLevel: student.gradeLevel, 
                          },
                      }
                    : undefined,},
        });
        
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
