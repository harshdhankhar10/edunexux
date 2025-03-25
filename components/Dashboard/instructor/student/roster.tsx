"use client"
import React from 'react';
// import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, Mail, UserPlus, MoreHorizontal, Users, ArrowUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { studentList, currentClasses } from '@/components/Dashboard/instructor/data/mockData';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const StudentsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Header /> */}
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center">
              <Users className="mr-3 h-8 w-8 text-primary" />
              Students
            </h1>
            <p className="text-slate-600 mt-1">Manage student rosters and information</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" /> Message All
            </Button>
            <Button className="flex items-center">
              <UserPlus className="mr-2 h-4 w-4" /> Add Student
            </Button>
          </div>
        </div>
        
        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-1/4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {currentClasses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.courseCode}: {course.courseName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-10" />
          </div>
          
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
        
        {/* Students Tab */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="animate-fade-up">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Class Roster</CardTitle>
                <CardDescription>
                  Total: {studentList.length} students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium p-3 text-sm flex items-center">
                          <span>Name</span>
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </th>
                        <th className="text-left font-medium p-3 text-sm">Email</th>
                        <th className="text-left font-medium p-3 text-sm">Courses</th>
                        <th className="text-left font-medium p-3 text-sm flex items-center">
                          <span>Attendance</span>
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </th>
                        <th className="text-left font-medium p-3 text-sm flex items-center">
                          <span>Avg. Grade</span>
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </th>
                        <th className="text-left font-medium p-3 text-sm">Last Active</th>
                        <th className="text-right font-medium p-3 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentList.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{student.name}</span>
                            </div>
                          </td>
                          <td className="p-3 text-sm">{student.email}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {student.courses.map((course) => (
                                <span key={course} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  {course}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <span className={`mr-2 ${student.attendance >= 90 ? 'text-emerald-600' : student.attendance >= 80 ? 'text-amber-600' : 'text-rose-600'}`}>
                                {student.attendance}%
                              </span>
                              <div className="w-16 bg-slate-200 h-2 rounded-full">
                                <div 
                                  className={`h-2 rounded-full ${student.attendance >= 90 ? 'bg-emerald-500' : student.attendance >= 80 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                                  style={{ width: `${student.attendance}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`${student.avgGrade >= 90 ? 'text-emerald-600' : student.avgGrade >= 80 ? 'text-amber-600' : 'text-rose-600'}`}>
                              {student.avgGrade}/100
                            </span>
                          </td>
                          <td className="p-3 text-sm">{student.lastActive}</td>
                          <td className="p-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuItem>View Assignments</DropdownMenuItem>
                                <DropdownMenuItem>Mark Attendance</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="text-center py-8 text-muted-foreground">
              Select a course to view active students
            </div>
          </TabsContent>
          
          <TabsContent value="inactive">
            <div className="text-center py-8 text-muted-foreground">
              No inactive students
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentsPage;
