import Attendance from '@/components/Dashboard/instructor/student/attendance/Attendance'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/lib/auth'

export default async function Page() {
  const session = await getServerSession(NEXT_AUTH)
  
  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  // Get instructor's courses
  const courses = await prisma.course.findMany({
    where: {
      instructor: { email: session.user.email }
    },
    select: {
      id: true,
      courseCode: true,
      courseName: true,
      enrollments: {
        select: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true
            }
          }
        }
      }
    }
  })

  // Transform data for the client
  const formattedCourses = courses.map((course:any) => ({
    id: course.id,
    name: `${course.courseCode}: ${course.courseName}`,
    students: course.enrollments.map((enrollment:any) => ({
      id: enrollment.user.id,
      name: `${enrollment.user.firstName} ${enrollment.user.lastName}`,
      avatar: enrollment.user.profilePicture || undefined
    }))
  }))

  // Get today's attendance records
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const todaysAttendance = await prisma.attendance.findMany({
    where: {
      date: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      },
      course: {
        instructor: { email: session.user.email }
      }
    },
    select: {
      id: true,
      status: true,
      studentId: true,
      courseId: true,
      note: true
    }
  })

  return (
    <Attendance 
      courses={formattedCourses} 
      todaysAttendance={todaysAttendance}
    />
  )
}