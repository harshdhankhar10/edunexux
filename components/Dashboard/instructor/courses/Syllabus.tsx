"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Plus, Trash2, MoveVertical, BookOpen } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { toast } from 'sonner';

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
}

interface Objective {
  id: string;
  description: string;
}

interface Week {
  id: string;
  weekNumber: number;
  title: string;
  content: string;
  readings: string;
  assignments: string;
}

interface CourseNames {
  courseCode: string;
  courseName: string;
  courseNames: Course[];
}


const SyllabusBuilderPage = ({courseNames}: CourseNames) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [courseDescription, setCourseDescription] = useState<string>('');
  const [academicTerm, setAcademicTerm] = useState<string>('');
  const [credits, setCredits] = useState<string>('');
  const [objectives, setObjectives] = useState<Objective[]>([{ id: '1', description: '' }]);
  const [weeks, setWeeks] = useState<Week[]>([
    { id: '1', weekNumber: 1, title: '', content: '', readings: '', assignments: '' }
  ]);
  const [sections, setSections] = useState({
    grading: false,
    attendance: false,
    materials: false,
    policies: false
  });

  const addObjective = () => {
    setObjectives([...objectives, { id: Date.now().toString(), description: '' }]);
  };

  const removeObjective = (id: string) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
  };

  const addWeek = () => {
    setWeeks([...weeks, { 
      id: Date.now().toString(), 
      weekNumber: weeks.length + 1, 
      title: '', 
      content: '', 
      readings: '', 
      assignments: '' 
    }]);
  };

  const removeWeek = (id: string) => {
    setWeeks(weeks.filter(week => week.id !== id));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/courses/syllabus', {
          courseId: selectedCourse,
          description: courseDescription,
          academicTerm,
          credits,
          objectives,
          weeks,
          sections
      });
      if(response.status === 201) {
        toast.success('Syllabus saved successfully');
      }

    } catch (error) {
      console.error(error);
      alert('Failed to save syllabus');
    }
  };

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 bg-blue-500 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
          
          <h1 className="text-3xl font-bold  flex items-center">
            <BookOpen className="mr-3 h-8 w-8 " />
            Syllabus Builder
          </h1>
          <p className=" mt-1">Create and manage your course syllabus</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>Select a course and update syllabus details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseSelect">Select Course</Label>
                    <Select onValueChange={setSelectedCourse}>
                      <SelectTrigger id="courseSelect">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseNames.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.courseCode}: {course.courseName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="courseDescription">Course Description</Label>
                    <Textarea 
                      id="courseDescription" 
                      placeholder="Enter a detailed description of your course"
                      rows={4}
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="academicTerm">Academic Term</Label>
                      <Input 
                        id="academicTerm" 
                        placeholder="e.g. Fall 2023" 
                        value={academicTerm}
                        onChange={(e) => setAcademicTerm(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="credits">Credits</Label>
                      <Input 
                        id="credits" 
                        type="number" 
                        placeholder="e.g. 3" 
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Course Objectives</CardTitle>
                <CardDescription>What students will learn in this course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {objectives.map((obj) => (
                    <div key={obj.id} className="flex items-start space-x-2 border p-3 rounded-md">
                      <div className="pt-1">
                        <MoveVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      </div>
                      <Textarea 
                        placeholder="Enter a learning objective" 
                        className="flex-1" 
                        value={obj.description}
                        onChange={(e) => {
                          const updated = objectives.map(o => 
                            o.id === obj.id ? {...o, description: e.target.value} : o
                          );
                          setObjectives(updated);
                        }}
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeObjective(obj.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full flex items-center" onClick={addObjective}>
                    <Plus className="mr-2 h-4 w-4" /> Add Objective
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>Outline the topics covered each week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {weeks.map((week) => (
                    <div key={week.id} className="border rounded-md p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg">Week {week.weekNumber}</h3>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <MoveVertical className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => removeWeek(week.id)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Topic Title</Label>
                        <Input 
                          placeholder="e.g. Introduction to the Course" 
                          value={week.title}
                          onChange={(e) => {
                            const updated = weeks.map(w => 
                              w.id === week.id ? {...w, title: e.target.value} : w
                            );
                            setWeeks(updated);
                          }}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Content & Activities</Label>
                        <Textarea 
                          placeholder="Describe what will be covered and any activities" 
                          rows={3} 
                          value={week.content}
                          onChange={(e) => {
                            const updated = weeks.map(w => 
                              w.id === week.id ? {...w, content: e.target.value} : w
                            );
                            setWeeks(updated);
                          }}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Readings & Resources</Label>
                        <Textarea 
                          placeholder="List required readings and resources" 
                          rows={2} 
                          value={week.readings}
                          onChange={(e) => {
                            const updated = weeks.map(w => 
                              w.id === week.id ? {...w, readings: e.target.value} : w
                            );
                            setWeeks(updated);
                          }}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Assignments</Label>
                        <Textarea 
                          placeholder="List any assignments due this week" 
                          rows={2} 
                          value={week.assignments}
                          onChange={(e) => {
                            const updated = weeks.map(w => 
                              w.id === week.id ? {...w, assignments: e.target.value} : w
                            );
                            setWeeks(updated);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full flex items-center" onClick={addWeek}>
                    <Plus className="mr-2 h-4 w-4" /> Add Week
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Syllabus Sections</CardTitle>
                <CardDescription>Standard sections to include</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="courseInfo" className="rounded" checked readOnly />
                  <Label htmlFor="courseInfo" className="text-sm cursor-pointer">Course Information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="objectives" className="rounded" checked readOnly />
                  <Label htmlFor="objectives" className="text-sm cursor-pointer">Learning Objectives</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="schedule" className="rounded" checked readOnly />
                  <Label htmlFor="schedule" className="text-sm cursor-pointer">Weekly Schedule</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="grading" 
                    className="rounded" 
                    checked={sections.grading}
                    onChange={(e) => setSections({...sections, grading: e.target.checked})}
                  />
                  <Label htmlFor="grading" className="text-sm cursor-pointer">Grading Policy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="attendance" 
                    className="rounded" 
                    checked={sections.attendance}
                    onChange={(e) => setSections({...sections, attendance: e.target.checked})}
                  />
                  <Label htmlFor="attendance" className="text-sm cursor-pointer">Attendance Policy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="materials" 
                    className="rounded" 
                    checked={sections.materials}
                    onChange={(e) => setSections({...sections, materials: e.target.checked})}
                  />
                  <Label htmlFor="materials" className="text-sm cursor-pointer">Required Materials</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="policies" 
                    className="rounded" 
                    checked={sections.policies}
                    onChange={(e) => setSections({...sections, policies: e.target.checked})}
                  />
                  <Label htmlFor="policies" className="text-sm cursor-pointer">Academic Policies</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" /> Save Syllabus
                </Button>
                <Button variant="outline" className="w-full">Preview</Button>
                <Button variant="outline" className="w-full">Export PDF</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SyllabusBuilderPage;