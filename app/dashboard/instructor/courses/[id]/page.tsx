import React from 'react'
import ManageCourse from '../ManageCouse'
import prisma from '@/lib/prisma'

interface PageProps {
  params: { id: string }
}

const Page = async ({ params }: PageProps) => {
  const {id} = params
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      instructor: {
        select: {
              firstName: true,
              lastName: true,
              email: true
        }
      },
      enrollments: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profilePicture: true,
              student: true
            }
          }
        }
      },
      materials: true,
      assignments: {
        include: {
          submissions: {
            select: {
              score: true,
              studentId: true
            }
          }
        }
      }
    }
  })

  const syllabus = await prisma.syllabus.findMany({
    where: {
      courseId: params.id
    },
    include: {
      objectives: true,
      weeks: true
    }
  });

  const allStudents = await prisma.user.findMany({
    where: {
      role: 'STUDENT'
    }, 
    include: {
        student: true
    }
  })

  if (!course) {
    return <div className="p-8 text-center">Course not found</div>
  }

  // Format students data
  const students = course.enrollments.map(enrollment => ({
    id: enrollment.user.id,
    firstName: enrollment.user.firstName,
    lastName: enrollment.user.lastName,
    email: enrollment.user.email,
    profilePicture: enrollment.user.profilePicture,
    gradeLevel: enrollment.user.student?.gradeLevel || 'N/A',
    enrollmentDate: enrollment.joinedAt.toISOString()
  }))

  // Calculate average grades
  const assignmentsWithAvg = course.assignments.map(assignment => {
    const submissions = assignment.submissions
    const avgScore = submissions.length > 0 
      ? submissions.reduce((sum, sub) => sum + (sub.score || 0), 0) / submissions.length
      : 0
    
    return {
      ...assignment,
      avgScore: Math.round(avgScore)
    }
  })

  // Prepare course stats
  const stats = {
    totalStudents: course.enrollments.length,
    completionPercentage: Math.round((course.enrollments.length / course.maximumStudents) * 100),
    activeAssignments: course.assignments.filter(a => new Date(a.dueDate) > new Date()).length,
    materialsCount: course.materials.length
  }

  return (
    <ManageCourse 
      course={{
        id: course.id,
        code: course.courseCode,
        name: course.courseName,
        description: course.description,
        status: course.status,
        startDate: course.startDate.toISOString(),
        endDate: course.endDate.toISOString(),
        instructor: {
          name: `${course.instructor.firstName} ${course.instructor.lastName}`,
          email: course.instructor.email
        }
      }}
      students={students}
      assignments={assignmentsWithAvg}
      materials={course.materials}
      stats={stats}
        allStudents={allStudents}
        syllabus={syllabus}
    />
  )
}

export default Page