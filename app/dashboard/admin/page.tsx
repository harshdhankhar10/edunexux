// import DashboardLayout from '@/components/Dashboard/admin/dashboard/DashboarLayout'
import Index from '@/components/Dashboard/admin/dashboard/Index'
import React from 'react'
import prisma from '@/lib/prisma';
import { NEXT_AUTH } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


 const page = async () => {
  const session = await getServerSession(NEXT_AUTH);
  if (!session) {
    redirect('/login');
  }
  const userInfo = await prisma.user.findUnique({
    where: { email: session?.user?.email! }
  });

  if(!session || !userInfo) {
    redirect('/login');
  }

  if (userInfo?.role !== 'ADMIN') {
    redirect('/login');
  }

  const allCourses = await prisma.course.findMany({});
  const allStudents = await prisma.student.findMany({});
  const allTeachers = await prisma.user.findMany({});


  return (
    <div>
      <Index 
        allCourses={allCourses.length}
        allStudents={allStudents.length}
        allTeachers={allTeachers.length}
      />
    </div>
  )
}

export default page