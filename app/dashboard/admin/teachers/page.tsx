import TeachersPage from '@/components/Dashboard/admin/teachers/all teacher/TeachersPage'
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

  // Fetch all teachers with their related data
  const teachers = await prisma.user.findMany({
    where: { role: 'INSTRUCTOR' },
    include: {
      instructor: true,
      instructedCourses: {
        include: {
          enrollments: true
        }
      },
      documents: true
    },
    orderBy: { createdAt: 'desc' }
  });

  // Calculate statistics
  const totalTeachers = teachers.length;
  
  // Calculate departments
  const departments = await prisma.course.findMany({
    select: {
      department: true
    },
    distinct: ['department']
  });
  const totalDepartments = departments.length;

  // Calculate average experience (assuming experience is stored in instructor.specialty)
  let totalExperience = 0;
  let experienceCount = 0;
  teachers.forEach(teacher => {
    const expMatch = teacher.instructor?.specialty?.match(/(\d+) years?/i);
    if (expMatch && expMatch[1]) {
      totalExperience += parseInt(expMatch[1]);
      experienceCount++;
    }
  });
  const avgExperience = experienceCount > 0 ? (totalExperience / experienceCount).toFixed(1) : '0';

  // Calculate average rating (assuming rating exists in your schema)
  // You might need to adjust this based on your actual rating system
  const avgRating = '4.7'; // Placeholder - implement your rating logic

  // Department distribution
  const departmentDist: Record<string, number> = {};
  teachers.forEach(teacher => {
    teacher.instructedCourses.forEach(course => {
      const dept = course.department || 'Unknown';
      departmentDist[dept] = (departmentDist[dept] || 0) + 1;
    });
  });
  const departmentDistribution = Object.entries(departmentDist).map(([name, teachers]) => ({
    name,
    teachers
  }));

  // Experience distribution
  const experienceDist = {
    '0-5 yrs': 0,
    '6-10 yrs': 0,
    '11-15 yrs': 0,
    '16+ yrs': 0
  };
  
  teachers.forEach(teacher => {
    const expMatch = teacher.instructor?.specialty?.match(/(\d+) years?/i);
    const years = expMatch && expMatch[1] ? parseInt(expMatch[1]) : 0;
    
    if (years <= 5) experienceDist['0-5 yrs']++;
    else if (years <= 10) experienceDist['6-10 yrs']++;
    else if (years <= 15) experienceDist['11-15 yrs']++;
    else experienceDist['16+ yrs']++;
  });
  const experienceDistribution = Object.entries(experienceDist).map(([name, value]) => ({
    name,
    value
  }));

  // Class size data (placeholder - adjust based on your actual data)
  const classSizeData = [
    { name: 'Jan', students: 1050 },
    { name: 'Feb', students: 1080 },
    { name: 'Mar', students: 1120 },
    { name: 'Apr', students: 1150 },
    { name: 'May', students: 1200 },
    { name: 'Jun', students: 1245 },
  ];

  // Transform teacher data for the table
  const transformedTeachers = teachers.map(teacher => {
    // Get primary subject/department from first course
    const primaryCourse = teacher.instructedCourses[0];
    const department = primaryCourse?.department || 'N/A';
    const subject = primaryCourse?.courseName || 'N/A';
    
    // Calculate total students across all courses
    const totalStudents = teacher.instructedCourses.reduce(
      (sum, course) => sum + (course.enrollments?.length || 0), 0
    );

    // Extract experience from specialty
    const expMatch = teacher.instructor?.specialty?.match(/(\d+) years?/i);
    const experience = expMatch ? `${expMatch[1]} years` : 'N/A';

    return {
      id: teacher.id,
      name: `${teacher.firstName} ${teacher.lastName}`,
      department,
      subject,
      experience,
      rating: '4.7', // Placeholder - implement your rating system
      classes: teacher.instructedCourses.length,
      students: totalStudents,
      status: teacher.accountStatus === 'ACTIVE' ? 'Active' : 'Inactive',
      joinDate: new Date(teacher.createdAt).toLocaleDateString()
    };
  });

  return (
    <TeachersPage 
      teachers={transformedTeachers}
      stats={{
        totalTeachers,
        totalDepartments,
        avgExperience: `${avgExperience} yrs`,
        avgRating
      }}
      departmentDistribution={departmentDistribution}
      experienceDistribution={experienceDistribution}
      classSizeData={classSizeData}
    />
  );
}

export default page;