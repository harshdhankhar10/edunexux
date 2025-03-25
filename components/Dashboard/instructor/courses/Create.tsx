"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, ArrowLeft, Save, Clock, Users, CalendarDays } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"

// Define types for our form data
interface ClassTiming {
  day: string;
  startTime: string;
  endTime: string;
  roomNumber: string;
}

interface CourseFormData {
  courseCode: string;
  courseName: string;
  description: string;
  department: string;
  level: string;
  status: string;
  coverImage: string;
  maximumStudents: number;
  enrollmentType: string;
  prerequisites: string;
  startDate: string;
  endDate: string;
  classTimings: ClassTiming[];
  materials: {
    title: string;
    description: string;
    requiredTextBooks: string;
    additionalResources: string;
  };
}

const CreateCoursePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<CourseFormData>({
    courseCode: '',
    courseName: '',
    description: '',
    department: '',
    level: '',
    status: 'PLANNED',
    coverImage: '',
    maximumStudents: 30,
    enrollmentType: 'open',
    prerequisites: '',
    startDate: '',
    endDate: '',
    classTimings: [],
    materials: {
      title: '',
      description: '',
      requiredTextBooks: '',
      additionalResources: ''
    }
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle material changes
  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      materials: {
        ...prev.materials,
        [name]: value
      }
    }));
  };

  // Add a new class timing
  const addClassTiming = () => {
    setFormData(prev => ({
      ...prev,
      classTimings: [
        ...prev.classTimings,
        { day: 'Monday', startTime: '09:00', endTime: '10:00', roomNumber: '' }
      ]
    }));
  };

  // Update class timing
  const updateClassTiming = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updatedTimings = [...prev.classTimings];
      updatedTimings[index] = {
        ...updatedTimings[index],
        [field]: value
      };
      return {
        ...prev,
        classTimings: updatedTimings
      };
    });
  };

  // Remove class timing
  const removeClassTiming = (index: number) => {
    setFormData(prev => {
      const updatedTimings = [...prev.classTimings];
      updatedTimings.splice(index, 1);
      return {
        ...prev,
        classTimings: updatedTimings
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/courses/create', formData);
      
      if (response.status === 201) {
        toast.success('Course created successfully!');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4 hover:bg-slate-600 hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
          
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create New Course</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Set up a new course for your students
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-200 dark:bg-slate-800">
                  <TabsTrigger 
                    value="details" 
                    className="data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                  >
                    Course Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="schedule"
                    className="data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                  >
                    Schedule
                  </TabsTrigger>
                  <TabsTrigger 
                    value="materials"
                    className="data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                  >
                    Materials
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-slate-900 dark:text-white">Basic Information</CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Enter the basic details about your course
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="courseCode">Course Code</Label>
                          <Input
                            id="courseCode"
                            name="courseCode"
                            value={formData.courseCode}
                            onChange={handleInputChange}
                            placeholder="e.g. CS 101"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="courseName">Course Name</Label>
                          <Input
                            id="courseName"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleInputChange}
                            placeholder="e.g. Introduction to Programming"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Describe what students will learn in this course"
                          rows={4}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select
                            value={formData.department}
                            onValueChange={(value) => handleSelectChange('department', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cs">Computer Science</SelectItem>
                              <SelectItem value="math">Mathematics</SelectItem>
                              <SelectItem value="physics">Physics</SelectItem>
                              <SelectItem value="bio">Biology</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="level">Level</Label>
                          <Select
                            value={formData.level}
                            onValueChange={(value) => handleSelectChange('level', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intro">Introductory</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="graduate">Graduate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-slate-900 dark:text-white">Enrollment Options</CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Configure how students can join your course
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="maximumStudents">Maximum Capacity</Label>
                          <Input
                            id="maximumStudents"
                            name="maximumStudents"
                            type="number"
                            min="1"
                            value={formData.maximumStudents}
                            onChange={handleInputChange}
                            placeholder="e.g. 40"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="enrollmentType">Enrollment Type</Label>
                          <Select
                            value={formData.enrollmentType}
                            onValueChange={(value) => handleSelectChange('enrollmentType', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Open Enrollment</SelectItem>
                              <SelectItem value="approval">Approval Required</SelectItem>
                              <SelectItem value="code">Enrollment Code</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="prerequisites">Prerequisites</Label>
                        <Textarea
                          id="prerequisites"
                          name="prerequisites"
                          value={formData.prerequisites}
                          onChange={handleInputChange}
                          placeholder="List any courses students should complete before enrolling"
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-6">
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-slate-900 dark:text-white">Course Schedule</CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Set the days and times for your course
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-md bg-slate-50 dark:bg-slate-800">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-slate-900 dark:text-white">Class Sessions</h3>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex items-center hover:bg-slate-600 hover:text-white"
                            onClick={addClassTiming}
                            type="button"
                          >
                            <Plus className="mr-1 h-3 w-3" /> Add Session
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          {formData.classTimings.length === 0 ? (
                            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                              No class sessions added yet
                            </p>
                          ) : (
                            formData.classTimings.map((timing, index) => (
                              <div key={index} className="bg-slate-100 dark:bg-slate-700 p-3 rounded-md border border-slate-200 dark:border-slate-600">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                  <div>
                                    <Label>Day</Label>
                                    <Select
                                      value={timing.day}
                                      onValueChange={(value) => updateClassTiming(index, 'day', value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Monday">Monday</SelectItem>
                                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                                        <SelectItem value="Thursday">Thursday</SelectItem>
                                        <SelectItem value="Friday">Friday</SelectItem>
                                        <SelectItem value="Saturday">Saturday</SelectItem>
                                        <SelectItem value="Sunday">Sunday</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Start Time</Label>
                                    <Input
                                      type="time"
                                      value={timing.startTime}
                                      onChange={(e) => updateClassTiming(index, 'startTime', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label>End Time</Label>
                                    <Input
                                      type="time"
                                      value={timing.endTime}
                                      onChange={(e) => updateClassTiming(index, 'endTime', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label>Room</Label>
                                    <Input
                                      placeholder="e.g. Room 101"
                                      value={timing.roomNumber}
                                      onChange={(e) => updateClassTiming(index, 'roomNumber', e.target.value)}
                                    />
                                  </div>
                                  <div className="flex items-end">
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => removeClassTiming(index)}
                                      type="button"
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="materials" className="space-y-6">
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-slate-900 dark:text-white">Course Materials</CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Add textbooks and other learning resources
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Required Textbooks</Label>
                        <Textarea
                          name="requiredTextBooks"
                          value={formData.materials.requiredTextBooks}
                          onChange={handleMaterialChange}
                          placeholder="Enter textbook titles, authors, and editions"
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Additional Resources</Label>
                        <Textarea
                          name="additionalResources"
                          value={formData.materials.additionalResources}
                          onChange={handleMaterialChange}
                          placeholder="List websites, articles, or other materials"
                          rows={3}
                        />
                      </div>
                      
                      <div className="border-dashed border-2 border-slate-300 dark:border-slate-600 p-8 rounded-md text-center">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-full">
                            <Plus className="h-6 w-6 text-slate-400 dark:text-slate-300" />
                          </div>
                          <h3 className="font-medium text-slate-900 dark:text-white">Upload Course Files</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Drop files here or click to browse
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="hover:bg-slate-600 hover:text-white"
                          >
                            Select Files
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Course Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {formData.startDate ? `Starts on ${new Date(formData.startDate).toLocaleDateString()}` : 'Not yet scheduled'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {formData.maximumStudents ? `Max ${formData.maximumStudents} students` : '0 students enrolled'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {formData.classTimings.length > 0 
                        ? `${formData.classTimings.length} session(s)` 
                        : 'No sessions scheduled'}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    type="submit" 
                    className="w-full flex items-center justify-center bg-slate-600 hover:bg-slate-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Create Course
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-slate-600 hover:text-white"
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        status: 'DRAFT'
                      });
                    }}
                  >
                    Save as Draft
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateCoursePage;