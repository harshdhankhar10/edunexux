import CreateAssignmentPage from '@/components/Dashboard/instructor/assignments/create/Create'
import React from 'react'
import prisma from '@/lib/prisma'

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
    </>
  )
}

export default page