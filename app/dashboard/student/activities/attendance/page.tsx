"use client";

import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Filter, ChevronDown,Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const AttendancePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const weeklyTimetable = [
    {
      day: 'Monday',
      date: 'Sep 18, 2023',
      classes: [
        { time: '09:00 AM - 11:00 AM', course: 'Mathematics 301', status: 'Present', color: 'bg-emerald-100', textColor: 'text-emerald-600' },
        { time: '12:00 PM - 02:00 PM', course: 'Physics 201', status: 'Present', color: 'bg-blue-100', textColor: 'text-blue-600' },
        { time: '03:00 PM - 05:00 PM', course: 'Literature 101', status: 'Absent', color: 'bg-red-100', textColor: 'text-red-600' },
      ],
    },
    {
      day: 'Tuesday',
      date: 'Sep 19, 2023',
      classes: [
        { time: '09:00 AM - 11:00 AM', course: 'Computer Science 202', status: 'Present', color: 'bg-purple-100', textColor: 'text-purple-600' },
        { time: '12:00 PM - 02:00 PM', course: 'History 202', status: 'Late', color: 'bg-amber-100', textColor: 'text-amber-600' },
      ],
    },
    {
      day: 'Wednesday',
      date: 'Sep 20, 2023',
      classes: [
        { time: '09:00 AM - 11:00 AM', course: 'Mathematics 301', status: 'Present', color: 'bg-emerald-100', textColor: 'text-emerald-600' },
        { time: '12:00 PM - 02:00 PM', course: 'Chemistry 301', status: 'Present', color: 'bg-cyan-100', textColor: 'text-cyan-600' },
      ],
    },
    {
      day: 'Thursday',
      date: 'Sep 21, 2023',
      classes: [
        { time: '09:00 AM - 11:00 AM', course: 'Physics 201', status: 'Present', color: 'bg-blue-100', textColor: 'text-blue-600' },
        { time: '12:00 PM - 02:00 PM', course: 'Literature 101', status: 'Absent', color: 'bg-red-100', textColor: 'text-red-600' },
      ],
    },
    {
      day: 'Friday',
      date: 'Sep 22, 2023',
      classes: [
        { time: '09:00 AM - 11:00 AM', course: 'Computer Science 202', status: 'Present', color: 'bg-purple-100', textColor: 'text-purple-600' },
        { time: '12:00 PM - 02:00 PM', course: 'History 202', status: 'Late', color: 'bg-amber-100', textColor: 'text-amber-600' },
      ],
    },
  ];

  const filteredTimetable = weeklyTimetable.filter(
    day => day.date.toLowerCase().includes(filterDate.toLowerCase()) &&
           day.classes.some(cls => cls.course.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className=" pt-24 container mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Weekly Timetable
              </h1>
              <p className="mt-1 text-gray-600">
                View your weekly class schedule and attendance status.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search classes..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter by Date
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <Card className="rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Day</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Classes</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimetable.map((day) => (
                  <tr key={day.day} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{day.day}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{day.date}</td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        {day.classes.map((cls, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg ${cls.color} ${cls.textColor} flex items-center justify-between`}
                          >
                            <div className="flex items-center space-x-3">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">{cls.time}</span>
                              <span className="font-semibold">{cls.course}</span>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : cls.status === 'Absent' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                              {cls.status === 'Present' ? 
                                <CheckCircle className="h-3 w-3 mr-1" /> : 
                                cls.status === 'Absent' ? 
                                  <XCircle className="h-3 w-3 mr-1" /> : 
                                  <Clock className="h-3 w-3 mr-1" />
                              }
                              {cls.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AttendancePage;