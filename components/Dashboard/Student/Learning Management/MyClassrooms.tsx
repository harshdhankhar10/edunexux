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

const ClassroomsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const classrooms = [
    {
      id: 1,
      name: "Mathematics 301",
      instructor: "Dr. Michael Stevens",
      schedule: "Mon, Wed, Fri • 9:00 AM - 11:00 AM",
      enrolled: 28,
      totalCapacity: 35,
      category: "Science",
      progress: 65,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Physics 201",
      instructor: "Prof. Robert Chen",
      schedule: "Tue, Thu • 1:00 PM - 3:00 PM",
      enrolled: 24,
      totalCapacity: 30,
      category: "Science",
      progress: 42,
      rating: 4.5,
    },
    {
      id: 3,
      name: "Literature 101",
      instructor: "Dr. Emily Garcia",
      schedule: "Mon, Wed • 2:00 PM - 4:00 PM",
      enrolled: 32,
      totalCapacity: 40,
      category: "Arts",
      progress: 78,
      rating: 4.9,
    },
    {
      id: 4,
      name: "Computer Science 202",
      instructor: "Prof. Alan Johnson",
      schedule: "Tue, Thu • 10:00 AM - 12:00 PM",
      enrolled: 26,
      totalCapacity: 30,
      category: "Technology",
      progress: 53,
      rating: 4.7,
    },
    {
      id: 5,
      name: "History 202",
      instructor: "Dr. Sarah Williams",
      schedule: "Wed, Fri • 1:00 PM - 3:00 PM",
      enrolled: 22,
      totalCapacity: 35,
      category: "Humanities",
      progress: 38,
      rating: 4.4,
    },
    {
      id: 6,
      name: "Chemistry 301",
      instructor: "Dr. James Wilson",
      schedule: "Mon, Wed, Fri • 11:00 AM - 12:30 PM",
      enrolled: 18,
      totalCapacity: 25,
      category: "Science",
      progress: 70,
      rating: 4.6,
    }
  ];

  const joinClassroom = (id: number) => {
    toast.success("Joined classroom successfully", {
      description: `You have joined ${classrooms.find(c => c.id === id)?.name}`,
    });
  };

  const filteredClassrooms = classrooms.filter(
    classroom => classroom.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 classroom.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 classroom.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Classrooms
              </h1>
              <p className="mt-1 text-gray-600">
                Browse and join classrooms to start learning
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Join New Classroom
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
                placeholder="Search classrooms, instructors, or subjects..."
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClassrooms.map((classroom) => (
            <Card 
              key={classroom.id} 
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
                    <span className="ml-1 text-sm font-medium">{classroom.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{classroom.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{classroom.instructor}</p>
                
                <div className="flex flex-col space-y-3 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {classroom.schedule}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    {classroom.enrolled}/{classroom.totalCapacity} Students
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    Course Progress: {classroom.progress}%
                  </div>
                </div>
                
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" 
                    style={{ width: `${classroom.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {classroom.category}
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    onClick={() => joinClassroom(classroom.id)}
                  >
                    View Class
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClassroomsPage;