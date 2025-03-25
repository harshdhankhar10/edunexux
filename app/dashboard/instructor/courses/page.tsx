
import CoursesPage from '@/components/Dashboard/instructor/courses/Index'
import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/lib/auth'

const page =async () => {
  const session = await getServerSession(NEXT_AUTH);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!
    }
  })

  const instructorId = user?.id;

  const courses = await prisma.course.findMany({
   where : {
    instructorId
   }, 
   include: {
    instructor: true
   } 
  })
  
  return (
    <>
      <CoursesPage courses={courses} />
    </>
  )
}

export default page