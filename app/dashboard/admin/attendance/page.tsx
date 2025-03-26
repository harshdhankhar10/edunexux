import AttendancePage from '@/components/Dashboard/admin/attendance/AttendancePage'
import React from 'react'
import prisma from '@/lib/prisma';
import { NEXT_AUTH } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(NEXT_AUTH);
  if (!session) redirect('/login');
  
  const userInfo = await prisma.user.findUnique({
    where: { email: session?.user?.email! }
  });

  if(!userInfo || userInfo?.role !== 'ADMIN') redirect('/login');

  // Get today's date at midnight for filtering
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Get today's attendance records
  const todayAttendances = await prisma.attendance.findMany({
    where: {
      date: {
        gte: today
      }
    },
    include: {
      course: {
        include: {
          instructor: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      }
    }
  });

  // 2. Get total student count
  const totalStudents = await prisma.user.count({
    where: {
      role: 'STUDENT'
    }
  });

  // Calculate today's attendance stats
  const presentToday = todayAttendances.filter(a => a.status === 'PRESENT').length;
  const absentToday = todayAttendances.filter(a => a.status === 'ABSENT').length;
  const todayAttendance = todayAttendances.length > 0 
    ? Math.round((presentToday / todayAttendances.length) * 100)
    : 0;

  // Group by course for recent records
  const courseGroups: Record<string, any> = {};
  todayAttendances.forEach(att => {
    const courseId = att.courseId;
    if (!courseGroups[courseId]) {
      courseGroups[courseId] = {
        course: att.course,
        present: 0,
        absent: 0,
        total: 0
      };
    }
    courseGroups[courseId].total++;
    if (att.status === 'PRESENT') {
      courseGroups[courseId].present++;
    } else {
      courseGroups[courseId].absent++;
    }
  });

  // Format recent records
  const recentRecords = Object.values(courseGroups).map((group: any) => ({
    id: group.course.id,
    date: today.toISOString().split('T')[0],
    class: group.course.courseName,
    teacher: group.course.instructor 
      ? `${group.course.instructor.firstName} ${group.course.instructor.lastName}`
      : 'Not Assigned',
    present: group.present,
    absent: group.absent,
    rate: Math.round((group.present / group.total) * 100)
  }));

  // For simplicity, using today's stats as weekly/monthly averages
  // In a real app, you'd fetch separate data for these
  const weeklyAverage = todayAttendance;
  const monthlyAverage = todayAttendance;

  return (
    <AttendancePage 
      initialData={{
        summary: {
          todayAttendance,
          weeklyAverage,
          monthlyAverage,
          totalStudents,
          presentToday,
          absentToday
        },
        recentRecords: recentRecords.slice(0, 6) // Limit to 6 records
      }}
    />
  );
}

export default page;