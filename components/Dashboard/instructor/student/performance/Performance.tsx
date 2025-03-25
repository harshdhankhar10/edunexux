"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Brain, GraduationCap, Trophy, Users } from "lucide-react";

// Temporary Data
const performanceData = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 78 },
  { month: 'Mar', score: 92 },
  { month: 'Apr', score: 88 },
  { month: 'May', score: 95 },
  { month: 'Jun', score: 86 },
];

const subjectPerformance = [
  { subject: 'Mathematics', score: 85 },
  { subject: 'Science', score: 92 },
  { subject: 'English', score: 78 },
  { subject: 'History', score: 88 },
  { subject: 'Geography', score: 90 },
];

const attendanceData = [
  { name: 'Present', value: 85 },
  { name: 'Absent', value: 15 },
];

const COLORS = ['#2563eb', '#dbeafe'];

const StudentCard = ({ icon: Icon, title, value, description }: { icon: any, title: string, value: string, description: string }) => (
  <Card className="p-6 flex items-start gap-4">
    <div className="p-3 bg-blue-100 rounded-lg">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </Card>
);

export default function StudentPerformance() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Performance Dashboard</h1>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StudentCard 
            icon={Trophy}
            title="Overall Grade"
            value="A"
            description="Top 10% of class"
          />
          <StudentCard 
            icon={Brain}
            title="Average Score"
            value="88%"
            description="Increased by 5%"
          />
          <StudentCard 
            icon={Users}
            title="Class Rank"
            value="#5"
            description="Out of 50 students"
          />
          <StudentCard 
            icon={BookOpen}
            title="Completed Assignments"
            value="45/50"
            description="90% completion rate"
          />
        </div>

        {/* Detailed Performance */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Performance Trend</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Subject Performance</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Attendance Overview</h3>
              <div className="h-[400px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}