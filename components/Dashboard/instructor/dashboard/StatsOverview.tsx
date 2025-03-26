"use client";
import React from 'react';
import { BookOpen, Users, Calendar, MessageSquare } from 'lucide-react';
import StatCard from '@/components/Dashboard/instructor/dashboard/StatCard';

interface StatsOverviewProps {
  stats: {
    activeCourses: number;
    totalStudents: number;
    upcomingDeadlines: number;
    unreadMessages: number;
  };
}

const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-up">
      <StatCard 
        title="Active Courses" 
        value={stats.activeCourses} 
        icon={BookOpen}
        className="animate-fade-up" 
        description="Courses currently in progress"
      />
      <StatCard 
        title="Total Students" 
        value={stats.totalStudents} 
        icon={Users}
        className="animate-fade-up [animation-delay:150ms]"
        description="Students across all courses"
      />
      <StatCard 
        title="Upcoming Deadlines" 
        value={stats.upcomingDeadlines} 
        icon={Calendar}
        className="animate-fade-up [animation-delay:300ms]"
        description="Assignments/exams due in next 7 days"
      />
      <StatCard 
        title="Unread Messages" 
        value={12}
        icon={MessageSquare}
        className="animate-fade-up [animation-delay:450ms]"
        description="Messages requiring attention"
      />
    </div>
  );
};

export default StatsOverview;