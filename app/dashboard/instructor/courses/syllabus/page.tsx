import SyllabusBuilderPage from '@/components/Dashboard/instructor/courses/Syllabus'
import React from 'react'
import prisma from '@/lib/prisma'

const page = async () => {
  const courses = await prisma.course.findMany()
  return (
    <>
      <SyllabusBuilderPage courseNames={courses} />
    </>
  )
}

export default page