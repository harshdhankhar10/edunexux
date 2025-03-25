
import React from 'react';
// import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Filter, FolderPlus, FileText, Download, Upload, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { currentClasses } from '@/components/Dashboard/instructor/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const CourseMaterialsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Header /> */}
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
          
          <h1 className="text-3xl font-bold text-slate-900">Course Materials</h1>
          <p className="text-slate-600 mt-1">Manage learning resources for your courses</p>
        </div>
        
        {/* Course Selector and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-1/3">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
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
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search materials..." className="pl-10" />
          </div>
          
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          
          <Button className="flex items-center">
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>
        
        {/* Materials Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="presentations">Presentations</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Folders */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-amber-100 p-3 rounded-md mr-4">
                    <FolderPlus className="h-6 w-6 text-amber-700" />
                  </div>
                  <div className="flex-1 truncate">
                    <h3 className="font-medium truncate">Lecture Slides</h3>
                    <p className="text-sm text-muted-foreground">12 items</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-emerald-100 p-3 rounded-md mr-4">
                    <FolderPlus className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div className="flex-1 truncate">
                    <h3 className="font-medium truncate">Assignments</h3>
                    <p className="text-sm text-muted-foreground">8 items</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-blue-100 p-3 rounded-md mr-4">
                    <FolderPlus className="h-6 w-6 text-blue-700" />
                  </div>
                  <div className="flex-1 truncate">
                    <h3 className="font-medium truncate">Reading Materials</h3>
                    <p className="text-sm text-muted-foreground">15 items</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Files */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-slate-100 p-3 rounded-md mr-4">
                    <FileText className="h-6 w-6 text-slate-700" />
                  </div>
                  <div className="flex-1 truncate">
                    <h3 className="font-medium truncate">Introduction to Programming.pdf</h3>
                    <p className="text-sm text-muted-foreground">2.3 MB • Updated 2 days ago</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-slate-100 p-3 rounded-md mr-4">
                    <FileText className="h-6 w-6 text-slate-700" />
                  </div>
                  <div className="flex-1 truncate">
                    <h3 className="font-medium truncate">Data Structures Lecture Notes.docx</h3>
                    <p className="text-sm text-muted-foreground">1.7 MB • Updated 1 week ago</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-slate-100 p-3 rounded-md mr-4">
                    <FileText className="h-6 w-6 text-slate-700" />
                  </div>
                  <div className="flex-1 truncate">
                    <h3 className="font-medium truncate">Machine Learning Project Guide.pdf</h3>
                    <p className="text-sm text-muted-foreground">4.1 MB • Updated 3 days ago</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="presentations">
            <div className="text-center py-8 text-muted-foreground">
              Select a course to view presentations
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="text-center py-8 text-muted-foreground">
              Select a course to view documents
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="text-center py-8 text-muted-foreground">
              Select a course to view videos
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CourseMaterialsPage;
