"use client"
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Search, Plus, Grid3X3, List, Clock, CheckCircle, Calendar, Users, GraduationCap } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface CoursesPageProps {
  courses: {
    id: string
    courseCode: string
    courseName: string
    description: string
    department: string
    level: string
    status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED'
    maximumStudents: number
    enrollmentType: string
    startDate: string
    endDate: string
    enrollments: {
      id: string
    }[]
    instructor: {
      firstName: string
      lastName: string
    }
  }[]
}

const CoursesPage = ({ courses }: CoursesPageProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'PLANNED' | 'IN_PROGRESS' | 'COMPLETED'>('PLANNED')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const getProgressStatus = (status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED') => {
    switch (status) {
      case 'PLANNED': return { progress: 0, label: 'Not Started', color: 'bg-gray-500' }
      case 'IN_PROGRESS': return { progress: 50, label: 'In Progress', color: 'bg-blue-600' }
      case 'COMPLETED': return { progress: 100, label: 'Completed', color: 'bg-green-600' }
      default: return { progress: 0, label: 'Not Started', color: 'bg-gray-500' }
    }
  }

  const formatDateRange = (start: string, end: string) => {
    if (!isMounted) return 'Loading...'
    const startDate = new Date(start)
    const endDate = new Date(end)
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  }

  const filteredCourses = courses.filter(course => {
    if (activeTab !== course.status) return false
    if (!searchQuery) return true
    return (
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Skeleton className="h-10 flex-1" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[350px] w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              My Teaching Courses
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage all your courses in one place
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/dashboard/instructor/courses/create">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                New Course
              </Button>
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses by name, code or department..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode('list')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="PLANNED" className="gap-2">
              <Calendar className="h-4 w-4" />
              Planned
            </TabsTrigger>
            <TabsTrigger value="IN_PROGRESS" className="gap-2">
              <Clock className="h-4 w-4" />
              Ongoing
            </TabsTrigger>
            <TabsTrigger value="COMPLETED" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed
            </TabsTrigger>
          </TabsList>

          {filteredCourses.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const { progress, label, color } = getProgressStatus(course.status)
                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      progress={progress}
                      progressLabel={label}
                      progressColor={color}
                      dateRange={formatDateRange(course.startDate, course.endDate)}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => {
                  const { progress, label, color } = getProgressStatus(course.status)
                  return (
                    <CourseListItem
                      key={course.id}
                      course={course}
                      progress={progress}
                      progressLabel={label}
                      progressColor={color}
                      dateRange={formatDateRange(course.startDate, course.endDate)}
                    />
                  )
                })}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                No {activeTab.toLowerCase()} courses found
              </h3>
              <p className="text-muted-foreground max-w-md">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "You haven't created any courses in this category yet"}
              </p>
              <Link href="/dashboard/instructor/courses/create" className="mt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create New Course
                </Button>
              </Link>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  )
}

const CourseCard = ({
  course,
  progress,
  progressLabel,
  progressColor,
  dateRange
}: {
  course: CoursesPageProps['courses'][0]
  progress: number
  progressLabel: string
  progressColor: string
  dateRange: string
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg line-clamp-2">
            {course.courseName}
          </CardTitle>
          <Badge variant="outline" className="shrink-0">
            {course.courseCode}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>{course.department} • {course.level}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{Math.floor(Math.random()*20)} students</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {dateRange}
          </div>
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{progressLabel}</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link href={`/dashboard/instructor/courses/${course.id}`} className="mt-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Manage Course
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

const CourseListItem = ({
  course,
  progress,
  progressLabel,
  progressColor,
  dateRange
}: {
  course: CoursesPageProps['courses'][0]
  progress: number
  progressLabel: string
  progressColor: string
  dateRange: string
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">{course.courseName}</h3>
                <Badge variant="outline">{course.courseCode}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {course.description}
              </p>
            </div>
            <Badge className="w-fit" variant="secondary">
              {progressLabel}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{course.department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Level</p>
              <p className="font-medium">{course.level}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Enrollments</p>
              <p className="font-medium">
                {Math.floor(Math.random()*20)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{dateRange}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50/50 md:w-80 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Course Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${progressColor}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1 text-right">
                {progress}% complete
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Enrollment Type</p>
              <Badge variant="outline" className="capitalize">
                {course.enrollmentType.toLowerCase().replace('-', ' ')}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Link href={`/dashboard/instructor/courses/${course.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            <Link href={`/dashboard/instructor/courses/${course.id}/edit`} className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CoursesPage