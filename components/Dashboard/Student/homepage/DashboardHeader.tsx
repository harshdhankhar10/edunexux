"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

const DashboardHeader = () => {
  // Get current time of day to personalize greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {getGreeting()}, Alex
          </h1>
          <p className="mt-1 text-gray-600">
            Here's what's happening with your academic progress today.
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button 
            variant="outline" 
            className="group transition-all duration-300 ease-in-out"
          >
            <Bell className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
            Notifications
          </Button>
          <Button className='bg-blue-500 hover:bg-blue-600 cursor-pointer'>Quick Actions</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;