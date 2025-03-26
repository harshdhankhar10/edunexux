import CurriculumPage from '@/components/Dashboard/admin/courses/curricullum/Curricullum'
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

  // Fetch curriculum data from Prisma
  const [syllabi, weeks] = await Promise.all([
    prisma.syllabus.findMany({
      include: {
        course: {
          select: {
            courseName: true
          }
        },
        weeks: true
      }
    }),
    prisma.week.findMany({
      include: {
        syllabus: {
          select: {
            course: {
              select: {
                courseName: true
              }
            }
          }
        }
      }
    })
  ]);

  // Transform syllabus data for subjects
  const subjects = syllabi.map(syllabus => ({
    id: syllabus.id,
    name: syllabus.course.courseName,
    totalModules: syllabus.weeks.length,
    progress: Math.floor(Math.random() * 50) + 50,
    lastUpdated: syllabus.updatedAt.toISOString().split('T')[0],
    status: syllabus.includeGradingPolicy ? 'active' : 'review'
  }));

  const modules = weeks.map(week => ({
    id: week.id,
    name: week.title,
    subject: week.syllabus.course.courseName,
    duration: `${week.weekNumber} weeks`,
    resources: week.content ? week.content.split('\n').length : 0,
    assessments: week.assignments ? week.assignments.split('\n').length : 0
  }));

  return (
    <CurriculumPage 
      initialData={{
        subjects,
        modules
      }}
    />
  );
}

export default page;