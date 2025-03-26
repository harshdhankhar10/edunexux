import StudentAttendancePage from '@/components/Dashboard/Admin/attendance/student/StudentAttendancePage';
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

  // Correct approach - direct relation to User
  const attendanceRecords = await prisma.attendance.findMany({
    where: {
      date: {
        gte: today
      }
    },
    include: {
      student: {  
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      },
      course: {
        select: {
          courseName: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  });

  // Transform data for the client
  const attendanceData = attendanceRecords.map(record => ({
    id: record.id,
    studentName: `${record.student.firstName} ${record.student.lastName}`,
    email: record.student.email,
    course: record.course.courseName,
    date: record.date.toISOString().split('T')[0],
    status: record.status,
    notes: record.note || 'N/A'
  }));

  // Calculate statistics
  const presentCount = attendanceRecords.filter(r => r.status === 'PRESENT').length;
  const absentCount = attendanceRecords.filter(r => r.status === 'ABSENT').length;
  const lateCount = attendanceRecords.filter(r => r.status === 'LATE').length;
  const totalStudents = await prisma.user.count({
    where: { 
      role: 'STUDENT',
      accountStatus: 'ACTIVE'
    }
  });

  return (
    <StudentAttendancePage 
      initialData={{
        attendanceRecords: attendanceData,
        stats: {
          totalStudents,
          presentCount,
          absentCount,
          lateCount,
          attendanceRate: totalStudents > 0 
            ? Math.round((presentCount / totalStudents) *10)
            : 0
        }
      }}
    />
  );
}

export default page;