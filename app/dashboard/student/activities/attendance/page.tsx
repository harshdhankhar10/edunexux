import StudentAttendance from './StudentAttendance'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/lib/auth'
import { subDays } from 'date-fns'

export default async function Page() {
  const session = await getServerSession(NEXT_AUTH)
  
  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  // Get student's enrollments with attendance records
  const enrollments = await prisma.courseEnrollment.findMany({
    where: {
      user: { email: session.user.email }
    },
    include: {
      course: {
        select: {
          id: true,
          courseCode: true,
          courseName: true,
          department: true,
          classTimings: true
        }
      },
      user: {
        select: {
          id: true
        }
      }
    }
  })

  // Get attendance records for the last 30 days by default
  const defaultStartDate = subDays(new Date(), 30)
  
  const attendanceRecords = await prisma.attendance.findMany({
    where: {
      student: { email: session.user.email },
      date: { gte: defaultStartDate }
    },
    orderBy: {
      date: 'asc'
    },
    include: {
      course: {
        select: {
          courseCode: true,
          courseName: true,
          department: true
        }
      }
    }
  })

  // Get unique departments for filtering
  const departments = Array.from(
    new Set(enrollments.map(e => e.course.department))
  ).filter(Boolean) as string[]

  // Organize data by day
  const attendanceByDay: Record<string, {
    date: Date
    classes: {
      time: string
      course: string
      department: string
      status: string
      color: string
      textColor: string
    }[]
  }> = {}

  // Process each attendance record
  attendanceRecords.forEach(record => {
    const dayKey = record.date.toISOString().split('T')[0]
    
    if (!attendanceByDay[dayKey]) {
      attendanceByDay[dayKey] = {
        date: record.date,
        classes: []
      }
    }

    // Find the class timing for this course
    const course = enrollments.find(e => e.courseId === record.courseId)?.course
    const classTime = course?.classTimings.find(t => 
      t.day === record.date.toLocaleDateString('en-US', { weekday: 'long' })
    )

    attendanceByDay[dayKey].classes.push({
      time: classTime 
        ? `${formatTime(classTime.startTime)} - ${formatTime(classTime.endTime)}` 
        : 'Class Time',
      course: `${course?.courseCode || ''} ${course?.courseName || ''}`.trim(),
      department: course?.department || '',
      status: record.status,
      color: getStatusColor(record.status).bg,
      textColor: getStatusColor(record.status).text
    })
  })

  // Convert to array and sort by date
  const weeklyTimetable = Object.entries(attendanceByDay)
    .map(([_, dayData]) => ({
      day: dayData.date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: formatDate(dayData.date),
      dateObj: dayData.date,
      classes: dayData.classes
    }))
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())

  return <StudentAttendance 
    weeklyTimetable={weeklyTimetable} 
    departments={departments} 
    defaultStartDate={defaultStartDate}
  />
}

// Helper functions
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getStatusColor(status: string): { bg: string; text: string } {
  switch (status) {
    case 'PRESENT':
      return { bg: 'bg-emerald-100', text: 'text-emerald-600' }
    case 'ABSENT':
      return { bg: 'bg-red-100', text: 'text-red-600' }
    case 'LATE':
      return { bg: 'bg-amber-100', text: 'text-amber-600' }
    case 'EXCUSED':
      return { bg: 'bg-blue-100', text: 'text-blue-600' }
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600' }
  }
}