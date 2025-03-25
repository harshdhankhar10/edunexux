"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  ChevronRight, 
  CreditCard, 
  FileText, 
  PieChart, 
  Sparkles, 
  Bot,
  Lightbulb,
  Clock,
  Award
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import DashboardHeader from '@/components/Dashboard/Student/homepage/DashboardHeader';
import StatCards from '@/components/Dashboard/Student/homepage/StatCards';
import UpcomingDeadlines from '@/components/Dashboard/Student/homepage/UpcomingDeadlines';
import AnnouncementsList from '@/components/Dashboard/Student/homepage/AnnouncementsList';
import PerformanceChart from '@/components/Dashboard/Student/homepage/PerformanceChart';

const page = () => {
  // Simulate page loading effect
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Feature highlight section
  const FeatureHighlight = ({ icon, title, description, linkTo, color }:any) => (
    <Link href={linkTo}>
      <Card className="h-full p-5 hover:shadow-md transition-shadow cursor-pointer border-l-4" style={{ borderLeftColor: color }}>
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-md`} style={{ backgroundColor: `${color}20` }}>
            {icon}
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="ghost" size="sm" className="text-xs">
            Explore Feature <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
     
      <main className="container mx-auto px-4 pt-24 pb-12">
        <DashboardHeader />
        
        <StatCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UpcomingDeadlines />
          <AnnouncementsList />
        </div>
        
        <h2 className="text-2xl font-semibold mb-4 mt-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <FeatureHighlight 
            icon={<Bot className="h-5 w-5 text-indigo-500" />}
            title="AI Tutor"
            description="Get personalized help with your studies through our AI tutor."
            linkTo="/ai-tutor"
            color="#6366f1"
          />
          <FeatureHighlight 
            icon={<Lightbulb className="h-5 w-5 text-amber-500" />}
            title="Smart Recommendations"
            description="Discover courses and resources tailored to your learning style."
            linkTo="/recommendations"
            color="#f59e0b"
          />
          <FeatureHighlight 
            icon={<CreditCard className="h-5 w-5 text-emerald-500" />}
            title="Fee Management"
            description="View and manage all your payments and financial information."
            linkTo="/payments"
            color="#10b981"
          />
          <FeatureHighlight 
            icon={<FileText className="h-5 w-5 text-blue-500" />}
            title="Assignments"
            description="Keep track of your assignments and submit your work."
            linkTo="/assignments"
            color="#3b82f6"
          />
          <FeatureHighlight 
            icon={<Calendar className="h-5 w-5 text-rose-500" />}
            title="Exams"
            description="View exam schedules and manage your preparation."
            linkTo="/exams"
            color="#f43f5e"
          />
          <FeatureHighlight 
            icon={<MessageSquare className="h-5 w-5 text-purple-500" />}
            title="Support Tickets"
            description="Raise and track support tickets for any issues you encounter."
            linkTo="/support"
            color="#a855f7"
          />
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">Your Performance</h2>
        <PerformanceChart />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <Card className="p-5">
              <h3 className="font-medium flex items-center">
                <Award className="h-5 w-5 mr-2 text-amber-500" />
                Your Learning Achievements
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/40 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Completed Advanced Algorithms</h4>
                      <p className="text-xs text-muted-foreground">Finished with distinction</p>
                    </div>
                  </div>
                  <Badge className='bg-blue-500 '>2 days ago</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/40 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <PieChart className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Data Analysis Milestone</h4>
                      <p className="text-xs text-muted-foreground">Completed 5 projects</p>
                    </div>
                  </div>
                  <Badge className='bg-blue-500'>1 week ago</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/40 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Perfect Attendance</h4>
                      <p className="text-xs text-muted-foreground">30 days streak</p>
                    </div>
                  </div>
                  <Badge className='bg-blue-500'>Ongoing</Badge>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  View All Achievements
                </Button>
              </div>
            </Card>
          </div>
          
          <Card className="p-5">
            <h3 className="font-medium flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              Recent Activity
            </h3>
            <div className="mt-4 space-y-4">
              {[
                { time: '10:30 AM', action: 'Submitted assignment for Physics' },
                { time: 'Yesterday', action: 'Attended online lecture on Data Structures' },
                { time: '2 days ago', action: 'Completed quiz with 90% score' },
                { time: '3 days ago', action: 'Downloaded study materials for Chemistry' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm">
                View All Activity
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default page;