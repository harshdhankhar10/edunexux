"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Plus, 
  BookOpen, 
  Calendar, 
  Users, 
  Clock,
  ArrowRight,
  Star,
  StarHalf
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CourseEnrollment, Course } from '@prisma/client';
import Link from 'next/link';

interface EnrolledCourse extends CourseEnrollment {
  course: Course & {
    instructor: {
      firstName: string;
      lastName: string;
    };
    classTimings: {
      day: string;
      startTime: Date;
      endTime: Date;
    }[];
  };
}

interface ClassroomsPageProps {
  courses: EnrolledCourse[];
}

const ClassroomsPage = ({ courses }: ClassroomsPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const filteredCourses = courses.filter((enrollment) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const course = enrollment.course;
    
    return (
      course.courseName.toLowerCase().includes(query) ||
      course.courseCode.toLowerCase().includes(query) ||
      `${course.instructor.firstName} ${course.instructor.lastName}`.toLowerCase().includes(query) ||
      course.department.toLowerCase().includes(query)
    );
  });

  const formatSchedule = (timings: {day: string, startTime: Date, endTime: Date}[]) => {
    if (!timings.length) return "Schedule not set";
    return timings.map(timing => 
      `${timing.day} ${timing.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}-${timing.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
    ).join(', ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Classrooms
              </h1>
              <p className="mt-1 text-gray-600">
                {courses.length} enrolled {courses.length === 1 ? 'course' : 'courses'}
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                disabled={isLoading}
              >
                <Plus className="h-4 w-4 mr-2" />
                {isLoading ? 'Processing...' : 'Join New Classroom'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <Card className="p-4 mb-6 border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by course name, code, instructor..."
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
        </Card>
        
        {/* Classrooms Grid */}
        {filteredCourses.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">
              {searchQuery ? 'No courses match your search' : 'You are not enrolled in any courses yet'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((enrollment) => {
              const course = enrollment.course;
              const instructorName = `${course.instructor.firstName} ${course.instructor.lastName}`;
              
              return (
                <Card 
                  key={enrollment.id} 
                  className="border border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="ml-1 text-sm font-medium">4.5</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">{course.courseCode}: {course.courseName}</h3>
                    <p className="text-gray-500 text-sm mb-4">Prof. {instructorName}</p>
                    
                    <div className="flex flex-col space-y-3 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatSchedule(course.classTimings)}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {course.maximumStudents} Students Max
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        Status: {course.status}
                      </div>
                    </div>
                    
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" 
                        style={{ width: '0' }} // Replace with actual progress
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {course.department}
                      </span>
                      <Link href={`/dashboard/student/learning/classrooms/${enrollment.courseId}`}>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      >
                        View Class
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ClassroomsPage;