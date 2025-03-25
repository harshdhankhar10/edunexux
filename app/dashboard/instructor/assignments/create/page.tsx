import CreateAssignmentPage from '@/components/Dashboard/instructor/assignments/create/Create'
import React from 'react'
import prisma from '@/lib/prisma'
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
    </>
  )
}

export default page