import ClassroomsPage from '@/components/Dashboard/Student/Learning Management/MyClassrooms'
import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/lib/auth'
import { CourseEnrollment, Course } from '@prisma/client'

interface EnrolledCourse extends CourseEnrollment {
  course: Course
}

const Page = async () => {
  const session = await getServerSession(NEXT_AUTH);
  
  if (!session?.user?.email) {
    throw new Error('Unauthorized - Please login to access this page');
  }

  try {
    const userInfo = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    if (!userInfo) {
      throw new Error('User not found');
    }

    const courses: EnrolledCourse[] = await prisma.courseEnrollment.findMany({
      where: { userId: userInfo.id },
      include: { 
        course: {
          include: {
            instructor: {
              select: {
                firstName: true,
                lastName: true
              }
            },
            classTimings: true
          }
        } 
      },
    });

    return <ClassroomsPage courses={courses} />;
    
  } catch (error) {
    console.error('Error fetching classroom data:', error);
    throw new Error('Failed to load classroom data');
  }
}

export default Page;