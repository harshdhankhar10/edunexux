import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const userInfo = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });
    const users = await prisma.user.findMany();

    const role = "STUDENT";
    const studentRoles = users.filter((user) => user.role === role);
    const { title, content, priority } = await req.json();
    const creatorId = userInfo?.id;

    for (const student of studentRoles) {
      await prisma.announcement.create({
        data: {
          title,
          content,
          priority,
          creatorId,
          receiverId: student.id,
        },
      });
    }

    return NextResponse.json({ message: "Announcement sent" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
