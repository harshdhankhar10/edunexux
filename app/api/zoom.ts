import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { studentId, meetingNumber, role = 0 } = body;

    if (!studentId || studentId.length < 5) {
      return NextResponse.json({ message: "Invalid student ID" }, { status: 400 });
    }

    if (!process.env.NEXT_ZOOM_CLIENT_ID || !process.env.NEXT_ZOOM_CLIENT_SECRET) {
      return NextResponse.json({ message: "Zoom credentials are missing" }, { status: 500 });
    }

    const signature = jwt.sign(
      {
        sdkKey: process.env.NEXT_ZOOM_CLIENT_ID,
        mn: meetingNumber,
        role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        tokenExp: Math.floor(Date.now() / 1000) + 3600,
        studentId,
      },
      process.env.NEXT_ZOOM_CLIENT_SECRET
    );

    return NextResponse.json({ signature }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error: (error as Error).message }, { status: 500 });
  }
}