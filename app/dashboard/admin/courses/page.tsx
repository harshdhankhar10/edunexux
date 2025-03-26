import CoursesPage from '@/components/Dashboard/admin/courses/all courses/CoursePage'
import React from 'react'
import prisma from '@/lib/prisma';
import { NEXT_AUTH } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(NEXT_AUTH);
  if (!session) redirect('/login');
  
  const userInfo = await prisma.user.findUnique({
    where: { email: session?.user?.email! }
  });

  if(!userInfo || userInfo?.role !== 'ADMIN') redirect('/login');

  // Fetch courses with their related data
  const courses = await prisma.course.findMany({
    include: {
      instructor: {
        select: {
          firstName: true,
          lastName: true
        }
      },
      enrollments: true
    },
    orderBy: {
      courseCode: 'asc'
    }
  });

  // Transform course data for the client
  const transformedCourses = courses.map(course => ({
    id: course.id,
    code: course.courseCode,
    name: course.courseName,
    department: course.department,
    instructor: course.instructor 
      ? `${course.instructor.firstName} ${course.instructor.lastName}`
      : 'Not Assigned',
    credits: course.credits || 0,
    students: course.enrollments.length,
    status: course.status === 'IN_PROGRESS' ? 'active' : 'inactive'
  }));

  // Calculate statistics
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'IN_PROGRESS').length;
  const avgClassSize = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + c.enrollments.length, 0) / courses.length)
    : 0;
  const totalDepartments = new Set(courses.map(c => c.department)).size;

  return (
    <CoursesPage 
      initialData={{
        courses: transformedCourses,
        stats: {
          totalCourses,
          activeCourses,
          avgClassSize,
          totalDepartments
        }
      }}
    />
  );
}

export default page;