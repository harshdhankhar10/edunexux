"use client";

import React from 'react';
import { 
  Calendar, 
  BookOpen, 
  CheckSquare, 
  Award 
} from 'lucide-react';

const StatCards = () => {
  const stats = [
    {
      title: 'Attendance',
      value: '92%',
      change: '+2.5%',
      positive: true,
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      bgClass: 'bg-blue-50',
      description: 'Present in 22/24 classes'
    },
    {
      title: 'Assignments',
      value: '84%',
      change: '-1.2%',
      positive: false,
      icon: <CheckSquare className="h-6 w-6 text-purple-500" />,
      bgClass: 'bg-purple-50',
      description: 'Completed 11/13 tasks'
    },
    {
      title: 'Study Materials',
      value: '75%',
      change: '+5.3%',
      positive: true,
      icon: <BookOpen className="h-6 w-6 text-emerald-500" />,
      bgClass: 'bg-emerald-50',
      description: 'Viewed 9/12 documents'
    },
    {
      title: 'Current GPA',
      value: '3.8',
      change: '+0.2',
      positive: true,
      icon: <Award className="h-6 w-6 text-amber-500" />,
      bgClass: 'bg-amber-50',
      description: 'Top 15% of class'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={`rounded-xl p-6 border border-gray-100 shadow-md backdrop-blur-sm animate-scale-in delay-${index * 100} hover:shadow-md transition-shadow duration-300`}
        >
          <div className="flex items-start justify-between">
            <div className={`${stat.bgClass} p-3 rounded-lg`}>
              {stat.icon}
            </div>
            <div className="flex items-center space-x-1">
              <span className={stat.positive ? 'text-emerald-500' : 'text-red-500'}>
                {stat.change}
              </span>
              <span className={`h-0 w-0 border-x-4 border-x-transparent ${stat.positive ? 'border-b-4 border-b-emerald-500' : 'border-t-4 border-t-red-500'}`}></span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-gray-500">{stat.title}</h3>
            <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-600">{stat.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;