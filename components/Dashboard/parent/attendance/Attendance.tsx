"use client";

import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Camera, QrCode, User, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Dashboard/parent/navbar/NavBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState('history');

  const attendanceHistory = [
    { id: 1, date: 'Sep 14, 2023', day: 'Monday', course: 'Mathematics 301', time: '09:00 AM - 11:00 AM', status: 'Present', statusColor: 'text-emerald-500', statusBg: 'bg-emerald-50' },
    { id: 2, date: 'Sep 14, 2023', day: 'Monday', course: 'Physics 201', time: '12:00 PM - 02:00 PM', status: 'Present', statusColor: 'text-emerald-500', statusBg: 'bg-emerald-50' },
    { id: 3, date: 'Sep 15, 2023', day: 'Tuesday', course: 'Literature 101', time: '10:00 AM - 12:00 PM', status: 'Absent', statusColor: 'text-red-500', statusBg: 'bg-red-50' },
    { id: 4, date: 'Sep 15, 2023', day: 'Tuesday', course: 'Computer Science 202', time: '02:00 PM - 04:00 PM', status: 'Present', statusColor: 'text-emerald-500', statusBg: 'bg-emerald-50' },
    { id: 5, date: 'Sep 16, 2023', day: 'Wednesday', course: 'Mathematics 301', time: '09:00 AM - 11:00 AM', status: 'Present', statusColor: 'text-emerald-500', statusBg: 'bg-emerald-50' },
    { id: 6, date: 'Sep 16, 2023', day: 'Wednesday', course: 'History 202', time: '01:00 PM - 03:00 PM', status: 'Late', statusColor: 'text-amber-500', statusBg: 'bg-amber-50' },
  ];

  const upcomingClasses = [
    { id: 1, date: 'Today', course: 'Physics 201', time: '12:00 PM - 02:00 PM', location: 'Science Building, Room 302', instructor: 'Dr. Robert Chen' },
    { id: 2, date: 'Today', course: 'Literature 101', time: '03:00 PM - 05:00 PM', location: 'Arts Building, Room 104', instructor: 'Prof. Emily Garcia' },
    { id: 3, date: 'Tomorrow', course: 'Mathematics 301', time: '09:00 AM - 11:00 AM', location: 'Science Building, Room 201', instructor: 'Dr. Michael Stevens' },
  ];

  const markAttendance = (method:any) => {
    toast.success(`Attendance marked using ${method}`, {
      description: "Your attendance has been successfully recorded.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen ">
      
      <main className="container mx-auto px-4  pb-12">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Attendance Tracking
              </h1>
              <p className="mt-1 text-gray-600">
                View your attendance records and mark attendance for upcoming classes.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                Mark Attendance
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="history" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="animate-fade-in">
            <Card className="rounded-xl border border-gray-100 shadow-soft p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Course</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceHistory.map((record) => (
                      <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm">
                          <div className="font-medium text-gray-900">{record.date}</div>
                          <div className="text-gray-500">{record.day}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{record.course}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{record.time}</td>
                        <td className="px-4 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${record.statusColor} ${record.statusBg}`}>
                            {record.status === 'Present' ? 
                              <CheckCircle className="h-3 w-3 mr-1" /> : 
                              record.status === 'Absent' ? 
                                <XCircle className="h-3 w-3 mr-1" /> : 
                                <Clock className="h-3 w-3 mr-1" />
                            }
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming" className="animate-fade-in">
            <Card className="rounded-xl border border-gray-100 shadow-soft p-6">
              <div className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div 
                    key={cls.id} 
                    className="p-4 rounded-lg border border-gray-100 hover:shadow-soft hover:border-primary/20 transition-all duration-300 bg-white/50"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2.5 rounded-lg bg-blue-50 text-blue-500">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{cls.course}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3.5 w-3.5 text-gray-500" />
                              <span>{cls.date}</span>
                            </div>
                            <div className="flex items-center space-x-1 mt-1 sm:mt-0">
                              <Clock className="h-3.5 w-3.5 text-gray-500" />
                              <span>{cls.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{cls.location}</p>
                          <p className="text-sm text-gray-600 mt-1">Instructor: {cls.instructor}</p>
                        </div>
                      </div>
                      <Button className="mt-4 md:mt-0" onClick={() => markAttendance('button')}>
                        Mark Attendance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="mark" className="animate-fade-in">
            <Card className="rounded-xl border border-gray-100 shadow-soft p-6">
              <div className="max-w-xl mx-auto text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Mark Your Attendance</h2>
                <p className="text-gray-600">Choose one of the following methods to mark your attendance for today's classes.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                  <div className="p-4 bg-blue-50 rounded-full text-blue-500 mb-4">
                    <QrCode className="h-8 w-8" />
                  </div>
                  <h3 className="font-medium mb-2">QR Code Scan</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">Scan the QR code displayed in your classroom.</p>
                  <Button className="w-full" onClick={() => markAttendance('QR code')}>
                    Open Scanner
                  </Button>
                </div>
                
                <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                  <div className="p-4 bg-purple-50 rounded-full text-purple-500 mb-4">
                    <Camera className="h-8 w-8" />
                  </div>
                  <h3 className="font-medium mb-2">Face Recognition</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">Use facial recognition to verify your attendance.</p>
                  <Button className="w-full" onClick={() => markAttendance('face recognition')}>
                    Start Camera
                  </Button>
                </div>
                
                <div className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                  <div className="p-4 bg-emerald-50 rounded-full text-emerald-500 mb-4">
                    <User className="h-8 w-8" />
                  </div>
                  <h3 className="font-medium mb-2">Manual Entry</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">Enter a code provided by your instructor.</p>
                  <Button className="w-full" onClick={() => markAttendance('manual entry')}>
                    Enter Code
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AttendancePage;
