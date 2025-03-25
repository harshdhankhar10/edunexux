
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, ArrowLeft, Save, Clock, Users, CalendarDays } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CreateCoursePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
          
          <h1 className="text-3xl font-bold text-slate-900">Create New Course</h1>
          <p className="text-slate-600 mt-1">Set up a new course for your students</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="details">Course Details</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Enter the basic details about your course</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="courseCode">Course Code</Label>
                        <Input id="courseCode" placeholder="e.g. CS 101" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courseName">Course Name</Label>
                        <Input id="courseName" placeholder="e.g. Introduction to Programming" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe what students will learn in this course" rows={4} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                          <SelectTrigger>
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
                        <Select>
                          <SelectTrigger>
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
                
                <Card>
                  <CardHeader>
                    <CardTitle>Enrollment Options</CardTitle>
                    <CardDescription>Configure how students can join your course</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Maximum Capacity</Label>
                        <Input id="capacity" type="number" min="1" placeholder="e.g. 40" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="enrollmentType">Enrollment Type</Label>
                        <Select>
                          <SelectTrigger>
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
                      <Textarea id="prerequisites" placeholder="List any courses students should complete before enrolling" rows={2} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Schedule</CardTitle>
                    <CardDescription>Set the days and times for your course</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <div className="flex">
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <div className="flex">
                          <Input type="date" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-md">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Class Sessions</h3>
                        <Button size="sm" variant="outline" className="flex items-center">
                          <Plus className="mr-1 h-3 w-3" /> Add Session
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-3 rounded-md border">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <Label>Day</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="monday">Monday</SelectItem>
                                  <SelectItem value="tuesday">Tuesday</SelectItem>
                                  <SelectItem value="wednesday">Wednesday</SelectItem>
                                  <SelectItem value="thursday">Thursday</SelectItem>
                                  <SelectItem value="friday">Friday</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Start Time</Label>
                              <Input type="time" />
                            </div>
                            <div>
                              <Label>End Time</Label>
                              <Input type="time" />
                            </div>
                            <div>
                              <Label>Room</Label>
                              <Input placeholder="e.g. Room 101" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="materials" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Materials</CardTitle>
                    <CardDescription>Add textbooks and other learning resources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Required Textbooks</Label>
                      <Textarea placeholder="Enter textbook titles, authors, and editions" rows={3} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Additional Resources</Label>
                      <Textarea placeholder="List websites, articles, or other materials" rows={3} />
                    </div>
                    
                    <div className="border-dashed border-2 border-slate-200 p-8 rounded-md text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="bg-slate-100 p-4 rounded-full">
                          <Plus className="h-6 w-6 text-slate-400" />
                        </div>
                        <h3 className="font-medium">Upload Course Files</h3>
                        <p className="text-sm text-muted-foreground">Drop files here or click to browse</p>
                        <Button variant="outline" size="sm">Select Files</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Not yet scheduled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">0 students enrolled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">No start date set</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full flex items-center justify-center">
                  <Save className="mr-2 h-4 w-4" /> Save Course
                </Button>
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCoursePage;
