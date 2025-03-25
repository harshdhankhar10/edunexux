"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Upload,
  FileText,
  AlertCircle,
  Circle,
  XCircle,
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend,
  Tooltip as RechartTooltip
} from 'recharts';
import { toast } from 'sonner';

const AssignmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const assignments = [
    {
      id: 1,
      title: "Mathematics Assignment 3",
      subject: "Mathematics 301",
      dueDate: "Sep 25, 2023",
      dueTime: "11:59 PM",
      status: "pending",
      instructor: "Dr. Michael Stevens",
      totalMarks: 50,
      submissionType: "PDF Document",
      timeRemaining: "3 days 5 hours",
      latePenalty: "10% per day",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics 201",
      dueDate: "Sep 20, 2023",
      dueTime: "05:00 PM",
      status: "overdue",
      instructor: "Prof. Robert Chen",
      totalMarks: 75,
      submissionType: "DOCX Document",
      timeRemaining: "Overdue by 1 day",
      latePenalty: "15% per day",
    },
    {
      id: 3,
      title: "Literary Analysis Paper",
      subject: "Literature 101",
      dueDate: "Oct 5, 2023",
      dueTime: "11:59 PM",
      status: "pending",
      instructor: "Dr. Emily Garcia",
      totalMarks: 100,
      submissionType: "PDF Document",
      timeRemaining: "2 weeks 1 day",
      latePenalty: "No late submissions",
    },
    {
      id: 4,
      title: "Programming Assignment 2",
      subject: "Computer Science 202",
      dueDate: "Sep 18, 2023",
      dueTime: "11:59 PM",
      status: "submitted",
      instructor: "Prof. Alan Johnson",
      totalMarks: 80,
      submissionType: "Code Files (.java)",
      submittedOn: "Sep 16, 2023 • 10:32 AM",
      feedback: "Great work on the implementation. Check the time complexity of your algorithms."
    },
    {
      id: 5,
      title: "Historical Research Paper",
      subject: "History 202",
      dueDate: "Sep 30, 2023",
      dueTime: "05:00 PM",
      status: "graded",
      instructor: "Dr. Sarah Williams",
      totalMarks: 100,
      marksObtained: 86,
      submissionType: "PDF Document",
      submittedOn: "Sep 28, 2023 • 02:16 PM",
      feedback: "Excellent research and argument structure. Could improve on citation formatting."
    },
    {
      id: 6,
      title: "Chemistry Lab Report",
      subject: "Chemistry 301",
      dueDate: "Sep 15, 2023",
      dueTime: "11:59 PM",
      status: "graded",
      instructor: "Dr. James Wilson",
      totalMarks: 60,
      marksObtained: 54,
      submissionType: "PDF Document",
      submittedOn: "Sep 14, 2023 • 08:45 PM",
      feedback: "Very thorough analysis and excellent documentation of your methodology."
    }
  ];

  const statusColors = {
    pending: { bg: 'bg-amber-50', text: 'text-amber-600', icon: <Clock className="h-4 w-4 mr-1" /> },
    submitted: { bg: 'bg-blue-50', text: 'text-blue-600', icon: <CheckCircle2 className="h-4 w-4 mr-1" /> },
    graded: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: <CheckCircle2 className="h-4 w-4 mr-1" /> },
    overdue: { bg: 'bg-red-50', text: 'text-red-600', icon: <AlertTriangle className="h-4 w-4 mr-1" /> },
  };

  const filteredAssignments = assignments.filter(
    assignment => (activeTab === 'all' || assignment.status === activeTab) &&
                  (assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const statusCounts = [
    { name: 'Pending', value: assignments.filter(a => a.status === 'pending').length, color: '#F59E0B' },
    { name: 'Submitted', value: assignments.filter(a => a.status === 'submitted').length, color: '#3B82F6' },
    { name: 'Graded', value: assignments.filter(a => a.status === 'graded').length, color: '#10B981' },
    { name: 'Overdue', value: assignments.filter(a => a.status === 'overdue').length, color: '#EF4444' },
  ];

  const handleSubmit = (id:any) => {
    toast.success("Assignment submitted successfully!", {
      description: "Your assignment has been uploaded and submitted for review.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Assignments
              </h1>
              <p className="mt-1 text-gray-600">
                Manage and submit your assignments and tests
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Button variant="outline" className="hover:bg-gray-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                Statistics
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Submission
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-5 col-span-1 lg:col-span-2 border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search assignments..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex-shrink-0 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="graded">Graded</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              {filteredAssignments.length === 0 ? (
                <div className="text-center py-10">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No assignments found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredAssignments.map((assignment) => (
                  <Card 
                    key={assignment.id} 
                    className="border border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-300 p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-grow">
                        <div className="flex items-start">
                          <div className="mr-4 p-2 rounded-lg bg-gray-100 text-gray-600">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{assignment.subject} • {assignment.instructor}</p>
                            
                            <div className="mt-2 flex flex-wrap items-center gap-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[assignment.status].bg} ${statusColors[assignment.status].text}`}>
                                {statusColors[assignment.status].icon}
                                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                              </span>
                              
                              <span className="inline-flex items-center text-xs text-gray-500">
                                <CalendarClock className="h-3.5 w-3.5 mr-1" />
                                Due: {assignment.dueDate} • {assignment.dueTime}
                              </span>
                              
                              {(assignment.status === 'submitted' || assignment.status === 'graded') && (
                                <span className="inline-flex items-center text-xs text-gray-500">
                                  <Upload className="h-3.5 w-3.5 mr-1" />
                                  Submitted: {assignment.submittedOn}
                                </span>
                              )}
                              
                              {assignment.status === 'graded' && (
                                <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                  {assignment.marksObtained}/{assignment.totalMarks}
                                </span>
                              )}
                            </div>
                            
                            {(assignment.status === 'pending' || assignment.status === 'overdue') && (
                              <div className="mt-3 text-xs">
                                <span className={`font-medium ${assignment.status === 'overdue' ? 'text-red-600' : 'text-amber-600'}`}>
                                  {assignment.timeRemaining}
                                </span>
                                {assignment.latePenalty && (
                                  <span className="ml-2 text-gray-500">
                                    Late penalty: {assignment.latePenalty}
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {assignment.feedback && (
                              <div className="mt-2 text-sm text-gray-600 italic">
                                "{assignment.feedback}"
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-4 md:mt-0">
                        {(assignment.status === 'pending' || assignment.status === 'overdue') && (
                          <Button 
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                            onClick={() => handleSubmit(assignment.id)}
                          >
                            Submit
                          </Button>
                        )}
                        {assignment.status === 'submitted' && (
                          <Button variant="outline" className="hover:bg-gray-50">
                            View Submission
                          </Button>
                        )}
                        {assignment.status === 'graded' && (
                          <Button variant="outline" className="hover:bg-gray-50">
                            View Feedback
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Card>
          
          <Card className="p-5 border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-lg mb-4">Assignment Overview</h3>
            
            <div className="h-[260px] mb-5">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusCounts}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {statusCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    wrapperStyle={{ paddingTop: "20px" }}
                  />
                  <RechartTooltip 
                    formatter={(value, name) => [`${value} Assignments`, name]}
                    labelFormatter={() => ""}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {statusCounts.map((status) => (
                <div key={status.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="h-3 w-3 rounded-full mr-2"
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{status.name}</span>
                  </div>
                  <span className="text-sm font-medium">{status.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AssignmentsPage;