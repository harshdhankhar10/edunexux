import TeacherAttendancePage from '@/components/Dashboard/admin/attendance/teacher/TeacherAttendance';
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

  // Fetch today's instructor attendance records
  const attendanceRecords = await prisma.attendance.findMany({
    where: {
      date: {
        gte: today
      },
      student: {
        role: 'INSTRUCTOR'
      }
    },
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          instructor: {
            select: {
              specialty: true
            }
          }
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

  // Get all instructors for stats
  const allInstructors = await prisma.user.findMany({
    where: { 
      role: 'INSTRUCTOR',
      accountStatus: 'ACTIVE'
    },
    include: {
      instructor: true
    }
  });

  // Get attendance data for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // First get all attendance records for instructors in the last 30 days
  const allRecentAttendance = await prisma.attendance.findMany({
    where: {
      date: {
        gte: thirtyDaysAgo
      },
      student: {
        role: 'INSTRUCTOR'
      }
    },
    select: {
      studentId: true,
      status: true
    }
  });

  // Calculate present days per instructor
  const attendanceByInstructor = allRecentAttendance.reduce((acc, record) => {
    if (!acc[record.studentId]) {
      acc[record.studentId] = { total: 0, present: 0 };
    }
    acc[record.studentId].total += 1;
    if (record.status === 'PRESENT') {
      acc[record.studentId].present += 1;
    }
    return acc;
  }, {} as Record<string, { total: number, present: number }>);

  // Calculate average attendance rate
  const instructorRates = Object.values(attendanceByInstructor)
    .map(({ present, total }) => total > 0 ? (present / total) * 100 : 0);
  
  const averageAttendance = instructorRates.length > 0 
    ? Math.round(instructorRates.reduce((sum, rate) => sum + rate, 0) / instructorRates.length)
    : 0;

  // Transform data for the client
  const instructorData = attendanceRecords.map(record => ({
    id: record.student.id,
    name: `${record.student.firstName} ${record.student.lastName}`,
    employeeId: record.student.id,
    department: record.student.instructor?.specialty || 'General',
    status: record.status,
    checkInTime: record.status === 'PRESENT' ? record.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
    checkOutTime: record.status === 'PRESENT' ? 
      new Date(record.date.getTime() + 8 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
    course: record.course.courseName
  }));

  // Calculate today's statistics
  const presentToday = attendanceRecords.filter(r => r.status === 'PRESENT').length;
  const absentToday = attendanceRecords.filter(r => r.status === 'ABSENT').length;
  const totalInstructors = allInstructors.length;

  return (
    <TeacherAttendancePage 
      initialData={{
        teachers: instructorData,
        stats: {
          totalTeachers: totalInstructors,
          presentToday,
          absentToday,
          averageAttendance,
          punctualityRate: 95 
        }
      }}
    />
  );
}

export default page;