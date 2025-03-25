"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Users, FileText, Calendar, Mail, Settings, Plus, Search, ListChecks, Clock, Bookmark, User, CircleSlash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import axios from 'axios'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Course {
  id: string
  code: string
  name: string
  description: string
  status: string
  startDate: string
  endDate: string
  instructor: {
    name: string
    email: string
  }
}

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  profilePicture?: string | null
  gradeLevel: string
  enrollmentDate: string
  student: {
    gradeLevel: string
  }
}

interface Assignment {
  id: string
  title: string
  dueDate: string
  avgScore: number
  totalPoints: number
}

interface Material {
  id: string
  title: string
  description: string | null
  createdAt: string
}

interface Objective {
  id: string
  description: string
  order: number
}

interface Week {
  id: string
  weekNumber: number
  title: string
  content: string
  readings: string
  assignments: string
  order: number
}

interface Syllabus {
  id: string
  description: string

  academicTerm: string
  credits: number
  objectives: Objective[]
  weeks: Week[]
  gradingPolicy?: string
  attendancePolicy?: string
  requiredMaterials?: string
  academicPolicies?: string
}

interface Stats {
  totalStudents: number
  completionPercentage: number
  activeAssignments: number
  materialsCount: number
}

interface ManageCourseProps {
  course: Course
  students: Student[]
  assignments: Assignment[]
  materials: Material[]
  stats: Stats
  allStudents: Student[]
  syllabus: Syllabus | null
}

const ManageCourse = ({ course, students, assignments, materials, stats, allStudents, syllabus }: ManageCourseProps) => {
    console.log(syllabus[0].objectives)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [openModel, setOpenModel] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModelForAddStudents = () => {
    setOpenModel(true)
  }

  const handleSearch = () => {
    setSearchQuery(searchTerm)
  }

  const handleAddStudent = (studentId: string) => async () => {
    setLoading(true)
    try {
      const response = await axios.post('/api/courses/add-student', {
        courseId: course.id,
        studentId
      })
      if (response.status === 201) {
        toast.success(response.data.message)
        setLoading(false)
      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      console.log(error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleWeek = (weekId: string) => {
    setExpandedWeek(expandedWeek === weekId ? null : weekId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              {course.code}: {course.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Instructor: {course.instructor.name} • {course.instructor.email}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleOpenModelForAddStudents} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Add Students
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Mail className="mr-2 h-4 w-4" /> Message Class
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <CircleSlash2 className="mr-2 h-4 w-4" /> Start Class
            </Button>
          </div>
        </div>

        {/* Modal for add students */}
        <AnimatePresence>
          {openModel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              >
                <h2 className="text-lg font-semibold text-gray-900">Add Students</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Add students to this course by email address
                </p>
                <div className="flex gap-2 mt-4">
                  <Input
                    type="text"
                    placeholder="Search students..."
                    className="flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="outline" onClick={() => setOpenModel(false)}>
                    Cancel
                  </Button>
                </div>
                {searchQuery && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Search Results
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Grade Level</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {allStudents
                            .filter(student => 
                              `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              student.email.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map(student => (
                              <TableRow key={student.id}>
                                <TableCell>
                                  {student.firstName} {student.lastName}
                                </TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student?.student.gradeLevel}</TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    onClick={handleAddStudent(student.id)}
                                    variant="outline" 
                                    size="sm" 
                                    className='bg-blue-600 hover:bg-blue-700 text-white'
                                  >
                                    Add Student
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Enrollment
              </CardTitle>
              <CardDescription>
                {stats.totalStudents} / {Math.round(stats.totalStudents / stats.completionPercentage * 100)} students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={stats.completionPercentage} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Duration
              </CardTitle>
              <CardDescription>
                {formatDate(course.startDate)} - {formatDate(course.endDate)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant={course.status === 'COMPLETED' ? 'destructive' : 'default'}>
                {course.status.toLowerCase()}
              </Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Assignments
              </CardTitle>
              <CardDescription>
                {stats.activeAssignments} active assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignments.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Materials
              </CardTitle>
              <CardDescription>
                Course resources available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.materialsCount}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="syllabus" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Syllabus
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Students ({students.length})
            </TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Assignments
            </TabsTrigger>
            <TabsTrigger value="materials" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Materials
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line">
                      {course.description || 'No description available'}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Plus className="mr-2 h-4 w-4" /> Create Assignment
                    </Button>
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      <Plus className="mr-2 h-4 w-4" /> Add Course Material
                    </Button>
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      <Mail className="mr-2 h-4 w-4" /> Email Students
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Syllabus Tab */}
          <TabsContent value="syllabus">
            {syllabus ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      Syllabus Overview
                    </CardTitle>
                    <CardDescription>
                      {course.code} - {course.name} | {syllabus.credits} Credits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="text-gray-700">{syllabus.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ListChecks className="h-5 w-5 text-blue-600" />
                      Learning Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 list-disc pl-5">
                      {syllabus[0].objectives.map((objective) => (
                        <li key={objective.id} className="text-gray-700">
                          {objective.description}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Course Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {syllabus[0]?.weeks.map((week) => (
                      <Collapsible key={week.id} open={expandedWeek === week.id} onOpenChange={() => toggleWeek(week.id)}>
                        <div className="rounded-lg border p-4">
                          <CollapsibleTrigger className="w-full">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                  {week.weekNumber}
                                </div>
                                <h3 className="font-medium">{week.title}</h3>
                              </div>
                              {expandedWeek === week.id ? (
                                <ChevronUp className="h-5 w-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-4 space-y-4">
                            <div>
                              <h4 className="font-medium text-sm text-gray-500 mb-2">Content & Activities</h4>
                              <p className="text-gray-700 whitespace-pre-line">{week.content}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-500 mb-2">Readings & Resources</h4>
                              <p className="text-gray-700 whitespace-pre-line">{week.readings}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-500 mb-2">Assignments</h4>
                              <p className="text-gray-700 whitespace-pre-line">{week.assignments}</p>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    ))}
                  </CardContent>
                </Card>

                {syllabus.gradingPolicy && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bookmark className="h-5 w-5 text-blue-600" />
                        Grading Policy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 whitespace-pre-line">{syllabus.gradingPolicy}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No syllabus created yet</h3>
                    <p className="mt-1 text-gray-500">Create a syllabus to outline your course structure</p>
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                      Create Syllabus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Student Roster</CardTitle>
                    <CardDescription>
                      {filteredStudents.length} of {students.length} students
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search students..." 
                      className="pl-10" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Grade Level</TableHead>
                      <TableHead>Enrolled</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map(student => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={student.profilePicture || undefined} />
                              <AvatarFallback>
                                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {student.firstName} {student.lastName}
                          </div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.gradeLevel}</TableCell>
                        <TableCell>{formatDate(student.enrollmentDate)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>
                  {assignments.length} total assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Avg Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map(assignment => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>{formatDate(assignment.dueDate)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {assignment.avgScore}/{assignment.totalPoints}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            View Submissions
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Materials Tab */}
          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>
                  {materials.length} resources available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materials.map(material => (
                    <Card key={material.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{material.title}</CardTitle>
                        <CardDescription>
                          Added {formatDate(material.createdAt)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {material.description || 'No description'}
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ManageCourse