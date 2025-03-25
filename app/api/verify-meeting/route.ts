import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, NEXT_AUTH);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { meetingNumber, studentId } = req.body;

    // Verify student exists and is enrolled in the course
    const student = await prisma.user.findUnique({
      where: { id: studentId },
      include: {
        enrolledCourses: {
          include: {
            course: {
              include: {
                meetings: {
                  where: { zoomMeetingId: meetingNumber },
                },
              },
            },
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ valid: false, message: "Student not found" });
    }

    const hasValidMeeting = student.enrolledCourses.some((enrollment:any) =>
      enrollment.course.meetings.some(
        (meeting:any) => meeting.zoomMeetingId === meetingNumber
      )
    );

    if (!hasValidMeeting) {
      return res.status(403).json({
        valid: false,
        message: "Student not enrolled in this meeting",
      });
    }

    res.status(200).json({ valid: true });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ valid: false, message: "Internal server error" });
  }
}