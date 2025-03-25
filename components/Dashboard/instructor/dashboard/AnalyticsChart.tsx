
import React from 'react';
import { BarChart2, CheckCircle2 } from 'lucide-react';
import { 
  studentPerformanceData, 
  assignmentCompletionData, 
  classTimeDistributionData,
  dashboardStats
} from '@/components/Dashboard/instructor/data/mockData';
import PerformanceChart from '@/components/Dashboard/instructor/dashboard/PerformanceChart';
import AssignmentChart from '@/components/Dashboard/instructor/dashboard/AssignmentChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Performance Trends */}
      <PerformanceChart 
        data={studentPerformanceData} 
        title="Student Performance Trends" 
        description="Average grades and attendance over time"
        className="animate-fade-up [animation-delay:300ms]"
      />
      
      {/* Assignment Completion */}
      <AssignmentChart 
        data={assignmentCompletionData} 
        title="Assignment Completion" 
        description="Submission status for recent assignments"
        className="animate-fade-up [animation-delay:450ms]"
      />
      
      {/* Class Time Distribution */}
      <AssignmentChart 
        data={classTimeDistributionData}
        chartType="pie"
        title="Class Time Distribution" 
        description="How classroom time is typically allocated"
        className="animate-fade-up [animation-delay:600ms]"
      />
      
      {/* Quick Stats */}
      <Card className="animate-fade-up [animation-delay:750ms]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart2 className="mr-2 h-5 w-5 text-primary" />
            Performance Overview
          </CardTitle>
          <CardDescription>Key metrics for all your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Attendance</span>
              <div className="flex items-center">
                <span className="text-lg font-bold">{dashboardStats.avgAttendance}%</span>
                <CheckCircle2 className="h-4 w-4 ml-2 text-emerald-500" />
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${dashboardStats.avgAttendance}%` }}></div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium">Average Grade</span>
              <div className="flex items-center">
                <span className="text-lg font-bold">{dashboardStats.avgGrade}/100</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${dashboardStats.avgGrade}%` }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
