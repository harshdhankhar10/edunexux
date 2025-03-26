import DepartmentPerformancePage from '@/components/Dashboard/admin/teachers/department/DepartmentPerformance'
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

  // 1. First get all departments
  const departments = await prisma.course.findMany({
    select: {
      department: true
    },
    distinct: ['department']
  });

  // 2. For each department, get basic stats
  const departmentStats = await Promise.all(
    departments.map(async (dept) => {
      // Get courses in this department
      const courses = await prisma.course.findMany({
        where: { department: dept.department },
        include: {
          enrollments: true,
          instructor: true,
          // Removed grades since it's not directly on Course
        }
      });

      // Get grades for these courses
      const grades = await prisma.grade.findMany({
        where: {
          courseId: {
            in: courses.map(c => c.id)
          }
        }
      });

      // Calculate basic metrics
      const teacherCount = new Set(
        courses.flatMap(c => c.instructor ? [c.instructor.id] : [])
      ).size;

      const studentCount = courses.reduce(
        (sum, course) => sum + course.enrollments.length, 0
      );

      // Calculate average grade from the grades we fetched
      const avgGrade = grades.length > 0 
        ? grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length
        : 0;

      const performanceIndex = Math.min(100, Math.round(avgGrade * 10));

      // Get department head
      const head = await prisma.user.findFirst({
        where: {
          role: 'INSTRUCTOR',
          instructedCourses: {
            some: { department: dept.department }
          }
        },
        select: { firstName: true, lastName: true }
      });

      // Determine rating
      let rating = 'average';
      if (performanceIndex >= 90) rating = 'excellent';
      else if (performanceIndex >= 80) rating = 'good';

      return {
        id: dept.department,
        name: dept.department,
        head: head ? `Dr. ${head.firstName} ${head.lastName}` : 'Not Assigned',
        teacherCount,
        studentCount,
        coursesOffered: courses.length,
        performanceIndex,
        rating
      };
    })
  );

  // 3. Prepare chart data
  const departmentPerformanceData = departmentStats.map(dept => ({
    name: dept.name.substring(0, 4),
    performanceIndex: dept.performanceIndex,
    teacherCount: dept.teacherCount
  }));

  const departmentRatingData = [
    { rating: 'Excellent', count: departmentStats.filter(d => d.rating === 'excellent').length },
    { rating: 'Good', count: departmentStats.filter(d => d.rating === 'good').length },
    { rating: 'Average', count: departmentStats.filter(d => d.rating === 'average').length }
  ];

  return (
    <DepartmentPerformancePage 
      initialData={{
        departments: departmentStats,
        departmentPerformanceData,
        departmentRatingData
      }}
    />
  );
}

export default page;