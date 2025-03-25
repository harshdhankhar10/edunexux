import CreateAssignmentPage from '@/components/Dashboard/instructor/assignments/create/Create'
import React from 'react'
import prisma from '@/lib/prisma'
<<<<<<< HEAD
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/lib/auth'

const page = async() => {
  const session = await getServerSession(NEXT_AUTH);
  const userInfo = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!
    }
  });

  // fetch only courses with this instructor id

  const courses = await prisma.course.findMany({
    where: {
      instructorId: userInfo?.id
    }
  });
  return (
    <>
      <CreateAssignmentPage allCourses={courses} />
=======

const page = async () => {
  const courseName = await prisma.course.findMany({
    select : {
      id:true,
      courseName: true,
      courseCode: true,
    }
  })
  
  return (
    <>
      <CreateAssignmentPage courseName={courseName}/>
>>>>>>> acc09cca01e4cd0473712f8d4d3137a9dd9020cc
    </>
  )
}

export default page