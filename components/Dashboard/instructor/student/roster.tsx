"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Mail, UserPlus, MoreHorizontal, Users } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

interface Course {
  courseId: string
  course: {
    courseCode: string
    courseName: string
  }
}

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  profilePicture?: string | null
  accountStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  enrolledCourses: Course[]
  lastActive?: string | null
}

interface StudentsPageProps {
  students: Student[]
}

const StudentsPage = ({ students }: StudentsPageProps) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  // Extract unique courses from students
  const courses = students.reduce((acc: {id: string, name: string}[], student) => {
    student.enrolledCourses.forEach(course => {
      if (!acc.some(c => c.id === course.courseId)) {
        acc.push({
          id: course.courseId,
          name: `${course.course.courseCode}: ${course.course.courseName}`
        })
      }
    })
    return acc
  }, [])

  // Filter students based on search, course, and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCourse = selectedCourse === 'all' || 
      student.enrolledCourses.some(c => c.courseId === selectedCourse)
    
    const matchesStatus = activeTab === 'all' || 
      (activeTab === 'active' ? student.accountStatus === 'ACTIVE' : student.accountStatus !== 'ACTIVE')
    
    return matchesSearch && matchesCourse && matchesStatus
  })

  // Calculate attendance percentage (mock)
  const getAttendance = (studentId: string) => {
    return Math.floor(Math.random() * 30) + 70 // 70-100%
  }

  // Calculate average grade (mock)
  const getAverageGrade = (studentId: string) => {
    return Math.floor(Math.random() * 30) + 70 // 70-100
  }

  // Format last active date
  const formatLastActive = (date: string | null | undefined) => {
    if (!date) return 'Never'
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="mr-3 h-8 w-8 text-blue-600" />
              Student Roster
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredStudents.length} of {students.length} students
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
            >
              <Mail className="h-4 w-4" /> 
              <span>Message All</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <UserPlus className="h-4 w-4" /> 
              <span>Add Student</span>
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-1/4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="hover:border-blue-500 focus:border-blue-500">
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search students by name or email..." 
              className="pl-10 border-gray-300 hover:border-blue-400 focus:border-blue-500" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-gray-100">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              All Students
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Active
            </TabsTrigger>
            <TabsTrigger 
              value="inactive" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Inactive
            </TabsTrigger>
          </TabsList>
          
          {/* All Students Tab */}
          <TabsContent value="all">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Student List</CardTitle>
                    <CardDescription>
                      Showing {filteredStudents.length} students
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCourse('all')
                      setActiveTab('all')
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-gray-700">Student</th>
                        <th className="text-left p-4 font-medium text-gray-700">Email</th>
                        <th className="text-left p-4 font-medium text-gray-700">Courses</th>
                        <th className="text-left p-4 font-medium text-gray-700">Attendance</th>
                        <th className="text-left p-4 font-medium text-gray-700">Status</th>
                        <th className="text-right p-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map(student => {
                        const attendance = getAttendance(student.id)
                        const avgGrade = getAverageGrade(student.id)
                        
                        return (
                          <tr key={student.id} className="border-b hover:bg-blue-50/30 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="border border-gray-200">
                                  <AvatarImage src={student.profilePicture || undefined} />
                                  <AvatarFallback className="bg-blue-100 text-blue-800">
                                    {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {student.firstName} {student.lastName}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatLastActive(student.lastActive)}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-sm text-gray-600">{student.email}</td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1 max-w-[200px]">
                                {student.enrolledCourses.slice(0, 2).map(course => (
                                  <Badge 
                                    key={course.courseId} 
                                    variant="outline" 
                                    className="text-blue-800 bg-blue-50 border-blue-200"
                                  >
                                    {course.course.courseCode}
                                  </Badge>
                                ))}
                                {student.enrolledCourses.length > 2 && (
                                  <Badge 
                                    variant="outline" 
                                    className="text-blue-600 bg-blue-50 border-blue-200"
                                  >
                                    +{student.enrolledCourses.length - 2} more
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${
                                  attendance >= 90 ? 'text-green-600' : 
                                  attendance >= 80 ? 'text-green-600' : 'text-rose-600'
                                }`}>
                                  {attendance}%
                                </span>
                                <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${
                                      attendance >= 90 ? 'bg-green-500' : 
                                      attendance >= 80 ? 'bg-amber-500' : 'bg-rose-500'
                                    }`} 
                                    style={{ width: `${attendance}%` }}
                                  />
                                </div>
                              </div>
                              <div className="mt-1">
                                <span className={`text-xs ${
                                  avgGrade >= 90 ? 'text-green-600' : 
                                  avgGrade >= 80 ? 'text-green-600' : 'text-rose-600'
                                }`}>
                                  Avg: {avgGrade}/100
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge 
                                variant={student.accountStatus === 'ACTIVE' ? 'default' : 'destructive'}
                                className="capitalize px-2.5 py-0.5 bg-blue-600 text-sm"
                              >
                                {student.accountStatus.toLowerCase()}
                              </Badge>
                            </td>
                            <td className="p-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="hover:bg-blue-100 text-gray-500 hover:text-gray-700"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem 
                                    onClick={() => router.push(`/dashboard/instructor/students/${student.id}`)}
                                    className="cursor-pointer"
                                  >
                                    <span>View Profile</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <span>Message</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <span>View Grades</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer text-rose-600">
                                    {student.accountStatus === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Empty States for other tabs */}
          <TabsContent value="active">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle>Active Students</CardTitle>
                <CardDescription>
                  Students with active accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12 text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {filteredStudents.some(s => s.accountStatus === 'ACTIVE') ? 
                    "Active students list" : 
                    "No active students found"}
                </h3>
                <p className="text-gray-500">
                  {filteredStudents.some(s => s.accountStatus === 'ACTIVE') ? 
                   
                    "Viewing all active students" : 
                    "All students currently have inactive accounts"}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle>Inactive Students</CardTitle>
                <CardDescription>
                  Suspended or inactive accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12 text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {filteredStudents.some(s => s.accountStatus !== 'ACTIVE') ? 
                    "Inactive students list" : 
                    "No inactive students found"}
                </h3>
                <p className="text-gray-500">
                  {filteredStudents.some(s => s.accountStatus !== 'ACTIVE') ? 
                    "Viewing all inactive students" : 
                    "All students currently have active accounts"}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default StudentsPage