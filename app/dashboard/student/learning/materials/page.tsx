"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Download,
  Eye,
  FileText,
  Film,
  Filter,
  FolderOpen,
  Search,
  SlidersHorizontal,
  Bookmark,
  FileImage,
  FileArchive,
  Clock,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const MaterialsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const studyMaterials = [
    {
      id: 1,
      title: "Advanced Calculus Textbook",
      type: "document",
      subject: "Mathematics",
      fileType: "PDF",
      fileSize: "18.5 MB",
      uploadDate: "Sep 15, 2023",
      instructor: "Dr. Michael Stevens",
      lastAccessed: "2 days ago",
      icon: <FileText className="h-6 w-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      title: "Newton's Laws Lecture Slides",
      type: "document",
      subject: "Physics",
      fileType: "PPTX",
      fileSize: "12.3 MB",
      uploadDate: "Sep 14, 2023",
      instructor: "Prof. Robert Chen",
      lastAccessed: "Yesterday",
      icon: <FileImage className="h-6 w-6" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      id: 3,
      title: "Literature Analysis Framework",
      type: "document",
      subject: "Literature",
      fileType: "DOCX",
      fileSize: "5.2 MB",
      uploadDate: "Sep 13, 2023",
      instructor: "Dr. Emily Garcia",
      lastAccessed: "4 days ago",
      icon: <FileText className="h-6 w-6" />,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      title: "Data Structures & Algorithms Lecture",
      type: "video",
      subject: "Computer Science",
      fileType: "MP4",
      fileSize: "350 MB",
      duration: "1h 15m",
      uploadDate: "Sep 12, 2023",
      instructor: "Prof. Alan Johnson",
      lastAccessed: "Just now",
      icon: <Film className="h-6 w-6" />,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      id: 5,
      title: "World War II Documentary Sources",
      type: "document",
      subject: "History",
      fileType: "PDF",
      fileSize: "28.7 MB",
      uploadDate: "Sep 10, 2023",
      instructor: "Dr. Sarah Williams",
      lastAccessed: "1 week ago",
      icon: <FileText className="h-6 w-6" />,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      id: 6,
      title: "Organic Chemistry Lab Resources Pack",
      type: "archive",
      subject: "Chemistry",
      fileType: "ZIP",
      fileSize: "45.3 MB",
      uploadDate: "Sep 8, 2023",
      instructor: "Dr. James Wilson",
      lastAccessed: "3 days ago",
      icon: <FileArchive className="h-6 w-6" />,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
  ];

  const filters = [
    { id: 'all', label: 'All Materials' },
    { id: 'document', label: 'Documents' },
    { id: 'video', label: 'Videos' },
    { id: 'archive', label: 'Archives' },
  ];

  const filteredMaterials = studyMaterials.filter(
    material => (activeFilter === 'all' || material.type === activeFilter) &&
                (material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 material.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Study Materials
              </h1>
              <p className="mt-1 text-gray-600">
                Access and download all your course materials
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <Button variant="outline" className="hover:bg-gray-50">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Sort By
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <FolderOpen className="h-4 w-4 mr-2" />
                My Downloads
              </Button>
            </div>
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <Card className="p-4     mb-6 border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search materials, subjects, or instructors..."
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
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.map(filter => (
              <Button 
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className={`text-sm ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </Card>
        
        {/* Materials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card 
              key={material.id} 
              className="border border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="px-4 py-2">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${material.bgColor} ${material.color}`}>
                    {material.icon}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-50">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                
                <h3 className="font-semibold text-base mb-1 line-clamp-2 text-gray-900">{material.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{material.subject} • {material.fileType}</p>
                
                <div className="flex flex-col space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Size:</span>
                    <span className="text-gray-700">{material.fileSize}</span>
                  </div>
                  {material.type === 'video' && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="text-gray-700">{material.duration}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Uploaded:</span>
                    <span className="text-gray-700">{material.uploadDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Instructor:</span>
                    <span className="text-gray-700">{material.instructor}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Last accessed: {material.lastAccessed}</span>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="hover:bg-gray-50">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MaterialsPage;