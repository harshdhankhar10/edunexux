import StudentsPage from '@/components/Dashboard/admin/students/all students/AllStudents'
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

  // Basic data fetching without complex aggregations
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    include: {
      student: true,
      attendanceRecords: true,
      grades: true
    },
    orderBy: { createdAt: 'desc' }
  });

  // Calculate statistics manually
  const totalStudents = students.length;
  
  // Calculate average attendance
  let totalAttendance = 0;
  let attendanceCount = 0;
  students.forEach(student => {
    const presentCount = student.attendanceRecords.filter(a => a.status === 'PRESENT').length;
    const totalRecords = student.attendanceRecords.length;
    if (totalRecords > 0) {
      totalAttendance += (presentCount / totalRecords) * 100;
      attendanceCount++;
    }
  });
  const avgAttendance = attendanceCount > 0 ? Math.round(totalAttendance / attendanceCount) : 0;

  // Calculate average grade
  let totalGrade = 0;
  let gradeCount = 0;
  students.forEach(student => {
    student.grades.forEach(grade => {
      totalGrade += grade.grade;
      gradeCount++;
    });
  });
  const avgGrade = gradeCount > 0 ? (totalGrade / gradeCount) : 0;

  // Count total classes
  const totalClasses = await prisma.course.count();

  // Grade distribution
  const gradeDist: Record<string, number> = {};
  students.forEach(student => {
    const grade = student.student?.gradeLevel || 'Unknown';
    gradeDist[grade] = (gradeDist[grade] || 0) + 1;
  });
  const gradeDistribution = Object.entries(gradeDist).map(([name, students]) => ({
    name,
    students
  }));

  // Performance distribution
  const performanceDist = {
    'Excellent': 0,
    'Very Good': 0,
    'Good': 0,
    'Average': 0,
    'Poor': 0
  };
  
  students.forEach(student => {
    const grades = student.grades;
    const avg = grades.length > 0 ? 
      grades.reduce((sum, g) => sum + g.grade, 0) / grades.length : 0;
    
    if (avg >= 90) performanceDist['Excellent']++;
    else if (avg >= 80) performanceDist['Very Good']++;
    else if (avg >= 70) performanceDist['Good']++;
    else if (avg >= 60) performanceDist['Average']++;
    else performanceDist['Poor']++;
  });
  const performanceDistribution = Object.entries(performanceDist).map(([name, value]) => ({
    name,
    value
  }));

  // Gender distribution
  const genderDist: Record<string, number> = {};
  students.forEach(student => {
    const gender = student.gender || 'Unknown';
    genderDist[gender] = (genderDist[gender] || 0) + 1;
  });
  const genderDistribution = Object.entries(genderDist).map(([name, value]) => ({
    name,
    value
  }));

  // Transform student data for the table
  const transformedStudents = students.map(student => {
    const attendanceRecords = student.attendanceRecords || [];
    const presentCount = attendanceRecords.filter(a => a.status === 'PRESENT').length;
    const attendancePercentage = attendanceRecords.length > 0 
      ? Math.round((presentCount / attendanceRecords.length) * 100)
      : 0;

    const grades = student.grades || [];
    const averageGrade = grades.length > 0
      ? grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length
      : 0;

    let performance = '';
    if (averageGrade >= 90) performance = 'Excellent';
    else if (averageGrade >= 80) performance = 'Very Good';
    else if (averageGrade >= 70) performance = 'Good';
    else if (averageGrade >= 60) performance = 'Average';
    else performance = 'Poor';

    const status = attendancePercentage < 70 || averageGrade < 60 ? 'Warning' : 'Active';

    return {
      id: student.id,
      name: `${student.firstName} ${student.lastName}`,
      grade: student.student?.gradeLevel || 'N/A',
      section: student.student?.gradeLevel ? `${student.student.gradeLevel.charAt(0)}` : 'N/A',
      gender: student.gender || 'N/A',
      attendance: `${attendancePercentage}%`,
      performance,
      status,
      joinDate: new Date(student.createdAt).toLocaleDateString()
    };
  });

  return (
    <StudentsPage 
      students={transformedStudents}
      stats={{
        totalStudents,
        avgAttendance: `${avgAttendance}%`,
        avgGrade: avgGrade.toFixed(2),
        totalClasses
      }}
      gradeDistribution={gradeDistribution}
      performanceDistribution={performanceDistribution}
      genderDistribution={genderDistribution}
    />
  );
}

export default page;