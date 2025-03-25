"use client"
import React from 'react';
import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, FileText, MessageSquare, Search, Send, Star, Upload, User } from 'lucide-react';
// import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { studentList } from '@/components/Dashboard/instructor/data/mockData';
// import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock submission data
const submissions = studentList.map(student => ({
  id: `sub-${student.id}`,
  studentId: student.id,
  studentName: student.name,
  studentEmail: student.email,
  studentAvatar: student.avatar,
  submissionDate: "Oct 10, 2023 at 2:45 PM",
  status: Math.random() > 0.2 ? "submitted" : "not_submitted",
  grade: Math.floor(Math.random() * 30) + 70,
  feedback: "",
  files: Math.random() > 0.3 ? [
    { name: "assignment_solution.pdf", size: "1.2 MB" },
    { name: "code_implementation.zip", size: "4.5 MB" }
  ] : []
}));

const GradeAssignmentsPage = () => {
  const [selectedSubmission, setSelectedSubmission] = React.useState(submissions[0]);

  const [inputValue, setInputValue] = useState("");

  const handleChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    alert(`Submitted value: ${inputValue}`);
  };

  
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
          <h1 className="text-3xl font-bold text-slate-900">Grade: Programming Fundamentals</h1>
        </div>
        
        <div className="flex flex-col-reverse md:flex-row gap-6">
          {/* Submissions List */}
          <div className="w-full md:w-80 flex-shrink-0">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Submissions</CardTitle>
                <CardDescription>
                  {submissions.filter(s => s.status === "submitted").length} of {submissions.length} students
                </CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search students..." className="pl-8" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
                  {submissions.map((submission) => (
                    <div 
                      key={submission.id}
                      className={`p-3 border-l-2 cursor-pointer ${
                        selectedSubmission.id === submission.id 
                          ? "border-l-primary bg-primary/5" 
                          : "border-l-transparent hover:bg-slate-50"
                      }`}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={submission.studentAvatar} alt={submission.studentName} />
                          <AvatarFallback>{submission.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{submission.studentName}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {submission.status === "submitted" 
                              ? `Submitted: ${submission.submissionDate}` 
                              : "Not submitted"}
                          </p>
                        </div>
                        {submission.status === "submitted" && (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            submission.grade >= 90 ? "bg-green-100 text-green-800" :
                            submission.grade >= 80 ? "bg-blue-100 text-blue-800" :
                            submission.grade >= 70 ? "bg-amber-100 text-amber-800" :
                                                "bg-red-100 text-red-800"
                          }`}>
                            {submission.grade}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Submission Details and Grading */}
          <div className="flex-1">
            {selectedSubmission.status === "submitted" ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={selectedSubmission.studentAvatar} alt={selectedSubmission.studentName} />
                          <AvatarFallback>{selectedSubmission.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{selectedSubmission.studentName}</CardTitle>
                          <CardDescription>{selectedSubmission.studentEmail}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Submission Date</Label>
                        <p className="text-sm">{selectedSubmission.submissionDate}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-muted-foreground">Submitted Files</Label>
                        <div className="mt-2 space-y-2">
                          {selectedSubmission.files.map((file, idx) => (
                            <div key={idx} className="flex items-center p-2 rounded-md border bg-slate-50">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm flex-1">{file.name}</span>
                              <span className="text-xs text-muted-foreground mr-2">{file.size}</span>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Grading</CardTitle>
                    <CardDescription>Provide feedback and assign a grade</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="grade">Grade</Label>
                          <span className="text-sm">{selectedSubmission.grade}/100</span>
                        </div>
                        <div className="flex space-x-4">
                        <input
          type="text"
          value={inputValue} // ✅ Controlled input
          onChange={handleChange} // ✅ Fixed error by adding onChange
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type something..."
        />
                          <Progress value={selectedSubmission.grade} className="flex-1 mt-3" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="feedback">Feedback</Label>
                        <Textarea 
                          id="feedback" 
                          placeholder="Enter your feedback for the student"
                          rows={5}
                        />
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Attach Files
                        </Button>
                        <div>
                          <Button variant="outline" className="mr-2">Save Draft</Button>
                          <Button>Submit Grade</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-64 flex items-center justify-center">
                <CardContent className="text-center">
                  <User className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium">No Submission</h3>
                  <p className="text-muted-foreground mt-1">
                    {selectedSubmission.studentName} has not submitted this assignment yet.
                  </p>
                  <Button variant="outline" className="mt-4">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GradeAssignmentsPage;
