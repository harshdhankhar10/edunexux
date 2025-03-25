"use client";
import React from 'react';
import { BookOpen, Users, Calendar, MessageSquare } from 'lucide-react';
import { dashboardStats } from '@/components/Dashboard/instructor/data/mockData';
import StatCard from '@/components/Dashboard/instructor/dashboard/StatCard';

const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-up">
      <StatCard 
        title="Active Courses" 
        value={dashboardStats.activeCourses} 
        icon={BookOpen}
        className="animate-fade-up" 
      />
      <StatCard 
        title="Total Students" 
        value={dashboardStats.totalStudents} 
        icon={Users}
        className="animate-fade-up [animation-delay:150ms]" 
      />
      <StatCard 
        title="Upcoming Deadlines" 
        value={dashboardStats.upcomingDeadlines} 
        icon={Calendar}
        className="animate-fade-up [animation-delay:300ms]" 
      />
      <StatCard 
        title="Unread Messages" 
        value={dashboardStats.unreadMessages} 
        icon={MessageSquare}
        className="animate-fade-up [animation-delay:450ms]" 
      />
    </div>
  );
};

export default StatsOverview;
