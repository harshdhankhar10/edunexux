"use client"
import React from 'react';
// import DashboardLayout from '@/app/dashboard/admin/layout';
import StatCard from '@/components/Dashboard/admin/dashboard/StatCard';
import AnalyticsCard from '@/components/Dashboard/admin/dashboard/AnalyticsCard';
import Chart from '@/components/Dashboard/admin/dashboard/Chart';
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data for charts
const attendanceData = [
  { month: 'Jan', students: 92, teachers: 98 },
  { month: 'Feb', students: 90, teachers: 97 },
  { month: 'Mar', students: 94, teachers: 99 },
  { month: 'Apr', students: 91, teachers: 98 },
  { month: 'May', students: 89, teachers: 97 },
  { month: 'Jun', students: 95, teachers: 100 },
  { month: 'Jul', students: 93, teachers: 99 },
];

const performanceData = [
  { name: 'Grade 6', average: 78 },
  { name: 'Grade 7', average: 82 },
  { name: 'Grade 8', average: 76 },
  { name: 'Grade 9', average: 85 },
  { name: 'Grade 10', average: 79 },
  { name: 'Grade 11', average: 88 },
  { name: 'Grade 12', average: 91 },
];

const enrollmentData = [
  { name: 'Science', value: 150 },
  { name: 'Arts', value: 120 },
  { name: 'Commerce', value: 100 },
  { name: 'Vocational', value: 80 },
];

const recentActivities = [
  {
    id: 1,
    activity: 'New student registered',
    user: 'John Smith',
    time: '2 hours ago',
    type: 'student',
  },
  {
    id: 2,
    activity: 'Teacher submitted grades',
    user: 'Sarah Johnson',
    time: '4 hours ago',
    type: 'teacher',
  },
  {
    id: 3,
    activity: 'Updated curriculum for Physics',
    user: 'David Lee',
    time: '5 hours ago',
    type: 'admin',
  },
  {
    id: 4,
    activity: 'Created new event',
    user: 'Maria Garcia',
    time: 'Yesterday',
    type: 'admin',
  },
  {
    id: 5,
    activity: 'Approved leave request',
    user: 'Robert Chen',
    time: 'Yesterday',
    type: 'admin',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Staff Meeting',
    date: 'Today, 2:00 PM',
    location: 'Conference Room A',
  },
  {
    id: 2,
    title: 'Parent-Teacher Conference',
    date: 'Tomorrow, 4:00 PM',
    location: 'Main Hall',
  },
  {
    id: 3,
    title: 'Science Fair',
    date: 'Jun 15, 9:00 AM',
    location: 'School Gymnasium',
  },
  {
    id: 4,
    title: 'Board Meeting',
    date: 'Jun 18, 10:00 AM',
    location: 'Administrative Building',
  },
];

const Index = () => {
  return (
    // <DashboardLayout>
      <div className="page-container">
        <h1 className="page-title">Dashboard</h1>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Students"
            value="1,245"
            icon={Users}
            trend={{ value: 5.2, isPositive: true }}
            trendText="vs last month"
            className="animate-fade-in"
            iconColor="bg-blue-100 text-blue-600"
          />
          
          <StatCard
            title="Total Teachers"
            value="86"
            icon={GraduationCap}
            trend={{ value: 2.1, isPositive: true }}
            trendText="vs last month"
            className="animate-fade-in [animation-delay:100ms]"
            iconColor="bg-emerald-100 text-emerald-600"
          />
          
          <StatCard
            title="Total Courses"
            value="42"
            icon={BookOpen}
            className="animate-fade-in [animation-delay:200ms]"
            iconColor="bg-amber-100 text-amber-600"
          />
          
          <StatCard
            title="Attendance Rate"
            value="94%"
            icon={Calendar}
            trend={{ value: 1.5, isPositive: false }}
            trendText="vs last month"
            className="animate-fade-in [animation-delay:300ms]"
            iconColor="bg-indigo-100 text-indigo-600"
          />
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AnalyticsCard 
            title="Attendance Trends" 
            className="animate-fade-in [animation-delay:400ms]"
          >
            <Chart
              type="line"
              data={attendanceData}
              xKey="month"
              keys={['students', 'teachers']}
              colors={['#2563eb', '#10b981']}
              height={300}
            />
            <div className="flex items-center justify-center mt-4 space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary-600 mr-2"></div>
                <span className="text-sm text-slate-600">Students</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-sm text-slate-600">Teachers</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard 
            title="Academic Performance" 
            className="animate-fade-in [animation-delay:500ms]"
          >
            <Chart
              type="bar"
              data={performanceData}
              xKey="name"
              dataKey="average"
              height={300}
              rounded
            />
          </AnalyticsCard>
        </div>
        
        {/* Third Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalyticsCard 
            title="Recent Activities" 
            className="lg:col-span-2 animate-fade-in [animation-delay:600ms]"
          >
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      activity.type === 'student' 
                        ? 'bg-blue-100'
                        : activity.type === 'teacher'
                        ? 'bg-emerald-100'
                        : 'bg-amber-100'
                    }`}
                  >
                    {activity.type === 'student' ? (
                      <Users className="w-4 h-4 text-blue-600" />
                    ) : activity.type === 'teacher' ? (
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Award className="w-4 h-4 text-amber-600" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-slate-800">{activity.activity}</p>
                    <p className="text-xs text-slate-500">By {activity.user}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="text-primary-600 hover:text-primary-700">
                View All Activities
              </Button>
            </div>
          </AnalyticsCard>
          
          <div className="space-y-6">
            <AnalyticsCard 
              title="Student Enrollment" 
              className="animate-fade-in [animation-delay:700ms]"
            >
              <Chart
                type="pie"
                data={enrollmentData}
                dataKey="value"
                xKey="name"
                height={200}
              />
            </AnalyticsCard>
            
            <AnalyticsCard 
              title="Upcoming Events" 
              className="animate-fade-in [animation-delay:800ms]"
            >
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start">
                    <div className="bg-primary-50 rounded-md p-2 flex-shrink-0">
                      <Clock className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-800">{event.title}</p>
                      <p className="text-xs text-slate-500">{event.date}</p>
                      <p className="text-xs text-slate-400">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" className="text-primary-600 hover:text-primary-700">
                  View Calendar
                </Button>
              </div>
            </AnalyticsCard>
          </div>
        </div>
      </div>
    // </DashboardLayout>
  );
};

export default Index;
