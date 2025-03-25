import StudentsPage from '@/components/Dashboard/instructor/student/roster'
import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/lib/auth'


const page = async () => {
  const allStudents = await prisma.user.findMany({
    where: {
      role: 'STUDENT'
    },
    include: {
      instructor: true,
      student: true,
      instructedCourses: true,
      enrolledCourses: true
    }
  }) 
  return (
    <>
      <StudentsPage students={allStudents} />
    </>
  )
}

export default page