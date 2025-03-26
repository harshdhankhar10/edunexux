import React from 'react';
import WelcomeSection from '@/components/Dashboard/instructor/dashboard/WelcomeSection';
import StatsOverview from '@/components/Dashboard/instructor/dashboard/StatsOverview';
import TodaySchedule from '@/components/Dashboard/instructor/dashboard/TodaySchedule';
import CurrentClasses from '@/components/Dashboard/instructor/dashboard/CurrentClasses';
import AnalyticsSection from '@/components/Dashboard/instructor/dashboard/AnalyticsChart';
import ActivitySection from '@/components/Dashboard/instructor/dashboard/ActivitySection';
import WeeklySchedule from '@/components/Dashboard/instructor/dashboard/WeeklySchedule';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '@/lib/auth';

const Index = async () => {
  const session = await getServerSession(NEXT_AUTH);
  
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  // Get instructor stats
  const currentDate = new Date();
  const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

  const stats = await prisma.$transaction([
    prisma.course.count({
      where: {
        instructor: { email: session.user.email },
        status: 'IN_PROGRESS'
      }
    }),
    prisma.courseEnrollment.count({
      where: {
        course: {
          instructor: { email: session.user.email }
        }
      }
    }),
    prisma.assignment.count({
      where: {
        course: {
          instructor: { email: session.user.email }
        },
        dueDate: {
          gte: startOfDay,
          lte: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        }
      }
    }),
    
  ]);

  // Get today's schedule
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDay = daysOfWeek[currentDate.getDay()];
  
  const todaySchedule = await prisma.classTiming.findMany({
    where: {
      course: {
        instructor: { email: session.user.email }
      },
      day: todayDay
    },
    include: {
      course: {
        select: {
          courseCode: true,
          courseName: true
        }
      }
    },
    orderBy: {
      startTime: 'asc'
    }
  });

  // Get today's meetings
  const todayMeetings = await prisma.meeting.findMany({
    where: {
      course: {
        instructor: { email: session.user.email }
      },
      startTime: {
        gte: startOfDay,
        lte: endOfDay
      }
    },
    include: {
      course: {
        select: {
          courseCode: true,
          courseName: true
        }
      }
    },
    orderBy: {
      startTime: 'asc'
    }
  });

  const [activeCourses, totalStudents, upcomingDeadlines] = stats;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <WelcomeSection />
        <StatsOverview 
          stats={{
            activeCourses,
            totalStudents,
            upcomingDeadlines,
          }} 
        />
        <TodaySchedule 
          classSchedule={todaySchedule}
          meetings={todayMeetings}
        />
        <CurrentClasses />
        <AnalyticsSection />
        <ActivitySection />
        <WeeklySchedule />
      </main>
    </div>
  );
};

export default Index;