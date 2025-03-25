"use client";
import React from 'react';
import { Clock } from 'lucide-react';
import { teachingSchedule } from '@/components/Dashboard/instructor/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TodaySchedule = () => {
  // Get today's schedule
  const today = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDay = daysOfWeek[today.getDay()];
  const todaySchedule = teachingSchedule.filter(item => item.day === todayDay);

  return (
    <div className="mb-8">
      <Card className="animate-fade-up [animation-delay:300ms]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary" />
            Today's Schedule
          </CardTitle>
          <CardDescription>Your classes and meetings for {todayDay}</CardDescription>
        </CardHeader>
        <CardContent>
          {todaySchedule.length > 0 ? (
            <div className="space-y-4">
              {todaySchedule.map((item) => (
                <div key={item.id} className="flex items-center p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="w-1 h-12 bg-primary rounded-full mr-4"></div>
                  <div className="flex-1">
                    <p className="font-medium">{item.courseCode ? `${item.courseCode}: ${item.courseName}` : item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.startTime} - {item.endTime} | {item.room}</p>
                  </div>
                  <div className="px-3 py-1 bg-slate-100 text-blue-500 rounded-full text-sm">
                    {item.type || "Class"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">No scheduled activities for today.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodaySchedule;
