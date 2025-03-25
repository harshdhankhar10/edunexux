"use client";
import React from 'react';
import { teacherProfile } from '@/components/Dashboard/instructor/data/mockData';

const WelcomeSection = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-900">Welcome back, {teacherProfile.name.split(' ')[0]}!</h1>
      <p className="text-slate-600 mt-1">Here's what's happening with your classes today.</p>
    </div>
  );
};

export default WelcomeSection;
