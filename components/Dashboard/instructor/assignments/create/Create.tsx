"use client"
import React from 'react';
import { Calendar, Check, ChevronLeft, Clock, FileText } from 'lucide-react';
// import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { currentClasses } from '@/components/Dashboard/instructor/data/mockData';

const CreateAssignmentPage = () => {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <a href="/assignments">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Assignments
            </a>
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">Create Assignment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
                <CardDescription>Enter the information for the new assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Assignment Title</Label>
                      <Input id="title" placeholder="Enter assignment title" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {currentClasses.map(course => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.courseCode}: {course.courseName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="type">Assignment Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="group">Group</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Due Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Due Time</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time">
                              <Clock className="mr-2 h-4 w-4" />
                              11:59 PM
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {["9:00 AM", "12:00 PM", "3:00 PM", "5:00 PM", "11:59 PM"].map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="points">Total Points</Label>
                      <Input id="points" type="number" placeholder="Enter total points" defaultValue="100" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Assignment Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Provide detailed instructions for the assignment"
                        rows={6}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" className="mr-2">
                      Save as Draft
                    </Button>
                    <Button type="submit">
                      <Check className="mr-2 h-4 w-4" />
                      Create Assignment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Options</CardTitle>
                <CardDescription>Additional assignment settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="visibility">Visibility</Label>
                    <Select defaultValue="visible">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visible">Visible to Students</SelectItem>
                        <SelectItem value="hidden">Hidden from Students</SelectItem>
                        <SelectItem value="scheduled">Scheduled Release</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="grading">Grading Scheme</Label>
                    <Select defaultValue="points">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="points">Points</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="letter">Letter Grade</SelectItem>
                        <SelectItem value="rubric">Rubric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="submission-type">Submission Type</Label>
                    <Select defaultValue="online">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="paper">On Paper</SelectItem>
                        <SelectItem value="external">External Tool</SelectItem>
                        <SelectItem value="none">No Submission</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select defaultValue="everyone">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="selected">Selected Students</SelectItem>
                        <SelectItem value="groups">Specific Groups</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
                <CardDescription>Add files to your assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center border-dashed">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Upload Files</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAssignmentPage;
