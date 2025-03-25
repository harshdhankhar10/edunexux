"use client";
import React from 'react';
import { teachingSchedule } from '@/components/Dashboard/instructor/data/mockData';
import ScheduleList from '@/components/Dashboard/instructor/dashboard/ScheduleList';

const WeeklySchedule = () => {
  return (
    <div className="mb-8">
      <ScheduleList 
        items={teachingSchedule}
        title="Weekly Schedule"
        description="Your teaching and meeting schedule for the week"
        className="animate-fade-up"
      />
    </div>
  );
};

export default WeeklySchedule;
