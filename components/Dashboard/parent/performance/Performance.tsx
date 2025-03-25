"use client";
import React from 'react';
// import Layout from '@/components/layout/Layout';
import PerformanceChart from '@/components/Dashboard/parent/performance/PerformanceChart';
import AttendanceChart from '@/components/Dashboard/parent/performance/AttendanceChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Performance: React.FC = () => {
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Performance</h1>
          <p className="text-gray-600">Detailed view of academic performance and attendance</p>
        </div>
        
        <Tabs defaultValue="grades" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-2">
            <TabsTrigger value="grades">Academic Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
          </TabsList>
          <TabsContent value="grades" className="mt-6">
            <PerformanceChart />
          </TabsContent>
          <TabsContent value="attendance" className="mt-6">
            <AttendanceChart />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Performance;
