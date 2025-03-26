import ViewClassInfo from '../ViewClassInfo';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  try {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profilePicture: true,
          }
        },
        classTimings: true,
        materials: true,
        assignments: {
          include: {
            submissions: true
          }
        },
        exams: true,
        announcements: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        },
        enrollments: {
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profilePicture: true
              }
            }
          }
        },
        syllabus: {
          include: {
            objectives: true,
            weeks: true
          }
        },
        meetings: {
          orderBy: {
            startTime: 'asc'
          }
        }
      }
    });


    if (!course) {
      return (
        <>
        <div className="flex items-center pt-24 justify-center h-full">
            <h1 className="text-3xl font-semibold text-gray-800">Course not found</h1>
            </div>
        </>
      )
    }

    return <ViewClassInfo course={course} />;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw new Error('Failed to load course details');
  }
}