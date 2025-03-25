"use client";

import React from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  FileText, 
  BookOpen, 
  PenTool,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const UpcomingDeadlines = () => {
  const deadlines = [
    {
      id: 1,
      title: 'Advanced Mathematics Assignment',
      course: 'Mathematics 301',
      dueDate: 'Sep 15, 2023',
      dueTime: '11:59 PM',
      type: 'assignment',
      priority: 'high',
      icon: <PenTool className="h-5 w-5" />
    },
    {
      id: 2,
      title: 'Physics Mid-Term Exam',
      course: 'Physics 201',
      dueDate: 'Sep 18, 2023',
      dueTime: '10:00 AM',
      type: 'exam',
      priority: 'high',
      icon: <AlertCircle className="h-5 w-5" />
    },
    {
      id: 3,
      title: 'Read Chapter 5-7',
      course: 'Literature 101',
      dueDate: 'Sep 20, 2023',
      dueTime: '11:59 PM',
      type: 'reading',
      priority: 'medium',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: 4,
      title: 'Research Paper Draft',
      course: 'History 202',
      dueDate: 'Sep 22, 2023',
      dueTime: '11:59 PM',
      type: 'assignment',
      priority: 'medium',
      icon: <FileText className="h-5 w-5" />
    }
  ];

  // Function to determine the priority color
  const getPriorityColor = (priority: any) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-amber-500 bg-amber-50';
      default:
        return 'text-emerald-500 bg-emerald-50';
    }
  };

  // Function to determine the type color
  const getTypeColor = (type:any) => {
    switch (type) {
      case 'assignment':
        return 'text-blue-500 bg-blue-50';
      case 'exam':
        return 'text-purple-500 bg-purple-50';
      case 'reading':
        return 'text-emerald-500 bg-emerald-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <Card className="rounded-xl border border-gray-100 shadow-soft p-6 animate-fade-in delay-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {deadlines.map((deadline) => (
          <div 
            key={deadline.id} 
            className="p-4 rounded-lg border border-gray-100 hover:shadow-soft hover:border-primary/20 transition-all duration-300 bg-white/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <div className={`p-2.5 rounded-lg ${getTypeColor(deadline.type)}`}>
                  {deadline.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{deadline.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{deadline.course}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs text-gray-600">{deadline.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs text-gray-600">{deadline.dueTime}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(deadline.priority)}`}>
                      {deadline.priority.charAt(0).toUpperCase() + deadline.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingDeadlines;