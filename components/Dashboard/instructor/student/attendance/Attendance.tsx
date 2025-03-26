"use client"
import React, { useState, useEffect } from 'react'
import { format, addDays, subDays, isToday } from 'date-fns'
import { Calendar, ChevronLeft, ChevronRight, Check, Clock, Ban, FileX, HelpCircle, Download, Printer, RefreshCw, ChevronsUpDown } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

// Define Types
type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' | 'PENDING'

interface Student {
  id: string
  name: string
  avatar?: string
  status: AttendanceStatus
  note?: string
}

interface Course {
  id: string
  name: string
  students: Student[]
}

interface AttendanceRecord {
  id?: string
  studentId: string
  courseId: string
  status: AttendanceStatus
  note?: string
}

export default function Attendance({ 
  courses,
  todaysAttendance
}: { 
  courses: Course[]
  todaysAttendance: AttendanceRecord[]
}) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.id || '')
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isClassSelectorOpen, setIsClassSelectorOpen] = useState(false)
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(todaysAttendance)

  // Initialize students based on selected course
  useEffect(() => {
    const currentCourse = courses.find(c => c.id === selectedCourse)
    if (!currentCourse) return

    const initialStudents = currentCourse.students.map(student => {
      const existingRecord = attendanceRecords.find(
        r => r.studentId === student.id && r.courseId === selectedCourse
      )
      
      return {
        ...student,
        status: existingRecord?.status || 'PENDING',
        note: existingRecord?.note || ''
      }
    })

    setStudents(initialStudents)
  }, [selectedCourse, courses, attendanceRecords])

  // Handle status change
  const handleStatusChange = async (studentId: string, status: AttendanceStatus) => {
    const updatedStudents = students.map(student => 
      student.id === studentId ? { ...student, status } : student
    )
    setStudents(updatedStudents)

    // Update or create attendance record
    try {
      const existingRecord = attendanceRecords.find(
        r => r.studentId === studentId && r.courseId === selectedCourse
      )

      const response = await fetch('/api/attendance', {
        method: existingRecord ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(existingRecord && { id: existingRecord.id }),
          studentId,
          courseId: selectedCourse,
          date: selectedDate,
          status,
          note: students.find(s => s.id === studentId)?.note || ''
        }),
      })

      if (!response.ok) throw new Error('Failed to update attendance')

      const result = await response.json()
      
      // Update local state
      setAttendanceRecords(prev => {
        const existing = prev.filter(r => 
          !(r.studentId === studentId && r.courseId === selectedCourse)
        )
        return [...existing, result]
      })

      toast.success(`Attendance marked as ${status.toLowerCase()}`, {
        description: `Updated for ${format(selectedDate, 'MMMM d, yyyy')}`,
      })
    } catch (error) {
      toast.error('Failed to update attendance')
      console.error(error)
    }
  }

  // Handle note change
  const handleNoteChange = async (studentId: string, note: string) => {
    setStudents(currentStudents => 
      currentStudents.map(student => 
        student.id === studentId ? { ...student, note } : student
      )
    )

    // Update attendance record with note
    try {
      const existingRecord = attendanceRecords.find(
        r => r.studentId === studentId && r.courseId === selectedCourse
      )

      if (existingRecord) {
        const response = await fetch('/api/attendance', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...existingRecord,
            note
          }),
        })

        if (!response.ok) throw new Error('Failed to update note')

        const result = await response.json()
        setAttendanceRecords(prev => 
          prev.map(r => r.id === result.id ? result : r)
        )
      }
    } catch (error) {
      console.error('Failed to update note:', error)
    }
  }

  // Handle date change
  const handleDateChange = async (date: Date) => {
    setSelectedDate(date)
    setIsLoading(true)
    
    try {
      const dateStart = new Date(date)
      dateStart.setHours(0, 0, 0, 0)
      
      const dateEnd = new Date(date)
      dateEnd.setHours(23, 59, 59, 999)

      const response = await fetch(
        `/api/attendance?courseId=${selectedCourse}&startDate=${dateStart.toISOString()}&endDate=${dateEnd.toISOString()}`
      )
      
      if (!response.ok) throw new Error('Failed to fetch attendance')

      const data = await response.json()
      setAttendanceRecords(data)
    } catch (error) {
      toast.error('Failed to load attendance records')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle previous day
  const handlePreviousDay = () => {
    const newDate = subDays(selectedDate, 1)
    setSelectedDate(newDate)
    handleDateChange(newDate)
  }

  // Handle next day
  const handleNextDay = () => {
    const newDate = addDays(selectedDate, 1)
    setSelectedDate(newDate)
    handleDateChange(newDate)
  }

  // Calculate statistics
  const totalStudents = students.length
  const present = students.filter(s => s.status === 'PRESENT').length
  const absent = students.filter(s => s.status === 'ABSENT').length
  const late = students.filter(s => s.status === 'LATE').length
  const excused = students.filter(s => s.status === 'EXCUSED').length
  const pending = students.filter(s => s.status === 'PENDING').length
  
  const attendanceRate = totalStudents > 0 
    ? Math.round(((present + late) / totalStudents) * 100) 
    : 0

  // StatusBadge component
  const StatusBadge = ({ 
    status, 
    onClick, 
    size = 'md',
    className = '' 
  }: { 
    status: AttendanceStatus; 
    onClick?: (status: AttendanceStatus) => void;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
  }) => {
    const baseClasses = "font-medium rounded-full transition-all duration-300 ease-out select-none"
    
    const sizeClasses = {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-3 py-1",
      lg: "text-base px-4 py-1.5"
    }
    
    const statusClasses = {
      PRESENT: "bg-green-100 text-green-800 border border-green-200",
      ABSENT: "bg-red-100 text-red-800 border border-red-200",
      LATE: "bg-amber-100 text-amber-800 border border-amber-200",
      EXCUSED: "bg-blue-100 text-blue-800 border border-blue-200",
      PENDING: "bg-gray-100 text-gray-800 border border-gray-200"
    }

    const hoverClasses = onClick ? {
      PRESENT: "hover:bg-green-200 hover:border-green-300 cursor-pointer",
      ABSENT: "hover:bg-red-200 hover:border-red-300 cursor-pointer",
      LATE: "hover:bg-amber-200 hover:border-amber-300 cursor-pointer",
      EXCUSED: "hover:bg-blue-200 hover:border-blue-300 cursor-pointer",
      PENDING: "hover:bg-gray-200 hover:border-gray-300 cursor-pointer"
    } : {}

    const statusLabels = {
      PRESENT: "Present",
      ABSENT: "Absent",
      LATE: "Late",
      EXCUSED: "Excused",
      PENDING: "Pending"
    }

    const classes = [
      baseClasses,
      sizeClasses[size],
      statusClasses[status],
      hoverClasses[status] || "",
      className
    ].join(' ')

    return (
      <span 
        className={classes}
        onClick={() => onClick && onClick(status)}
      >
        {statusLabels[status]}
      </span>
    )
  }

  // StudentRow component
  const StudentRow = ({ 
    student, 
    onStatusChange, 
    onNoteChange 
  }: { 
    student: Student; 
    onStatusChange: (studentId: string, status: AttendanceStatus) => void; 
    onNoteChange: (studentId: string, note: string) => void;
  }) => {
    const [isEditingNote, setIsEditingNote] = useState(false)
    const [note, setNote] = useState(student.note || '')
    
    const statusIcons = {
      PRESENT: <Check className="h-5 w-5 text-green-600" />,
      ABSENT: <Ban className="h-5 w-5 text-red-600" />,
      LATE: <Clock className="h-5 w-5 text-amber-600" />,
      EXCUSED: <FileX className="h-5 w-5 text-blue-600" />,
      PENDING: <HelpCircle className="h-5 w-5 text-gray-400" />
    }
    
    const handleStatusClick = (status: AttendanceStatus) => {
      onStatusChange(student.id, status)
    }
    
    const handleNoteSubmit = () => {
      onNoteChange(student.id, note)
      setIsEditingNote(false)
    }

    return (
      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
        <td className="py-4 px-4">
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              {student.avatar ? (
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border border-gray-200">
                  <span className="text-blue-700 font-medium text-sm">
                    {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1">
                {statusIcons[student.status]}
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">{student.name}</div>
            </div>
          </div>
        </td>
        
        <td className="py-4 px-4">
          <div className="flex flex-wrap gap-2">
            {['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'].map((status) => (
              <StatusBadge 
                key={status} 
                status={status as AttendanceStatus}
                onClick={handleStatusClick}
                size="sm"
                className={
                  student.status === status 
                    ? "ring-2 ring-offset-2 ring-blue-300" 
                    : "opacity-70"
                }
              />
            ))}
          </div>
        </td>
        
        <td className="py-4 px-4">
          {isEditingNote ? (
            <div className="flex">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="flex-1 px-3 py-1 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Add a note..."
                autoFocus
              />
              <button
                onClick={handleNoteSubmit}
                className="px-3 py-1 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          ) : (
            <div 
              onClick={() => setIsEditingNote(true)}
              className="text-sm text-gray-500 min-h-[24px] cursor-text hover:text-gray-700 transition-colors"
            >
              {student.note || "Click to add a note..."}
            </div>
          )}
        </td>
      </tr>
    )
  }

  // Class selector
  const ClassSelector = () => {
    const selectedClassName = courses.find(c => c.id === selectedCourse)?.name || 'Select Class'

    return (
      <div className="relative">
        <button
          onClick={() => setIsClassSelectorOpen(!isClassSelectorOpen)}
          className="flex items-center justify-between w-full md:w-64 px-4 py-2.5 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          <span className="font-medium truncate">{selectedClassName}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 text-gray-500 shrink-0" />
        </button>

        {isClassSelectorOpen && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg border border-gray-200 animate-in fade-in">
            <div className="p-1">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`relative flex cursor-pointer select-none items-center rounded-md px-3 py-2.5 transition-colors duration-200 ease-out ${
                    selectedCourse === course.id 
                      ? "bg-blue-50 text-blue-900" 
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setSelectedCourse(course.id)
                    setIsClassSelectorOpen(false)
                  }}
                >
                  <span className="font-medium">{course.name}</span>
                  {selectedCourse === course.id && (
                    <Check className="ml-auto h-4 w-4 text-blue-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">No Courses Found</h1>
          <p className="text-gray-600 mb-6">You don't have any courses assigned to mark attendance.</p>
          <button
            onClick={() => router.push('/dashboard/instructor/courses')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900 mr-6">Attendance</h1>
              <ClassSelector />
            </div>
            
            <div className="relative">
              {/* Date navigation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousDay}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                  aria-label="Previous day"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  className="flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 hover:border-blue-300 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span className={`font-medium ${isToday(selectedDate) ? "text-blue-600" : ""}`}>
                    {isToday(selectedDate) ? "Today" : format(selectedDate, "MMMM d, yyyy")}
                  </span>
                </button>
                
                <button
                  onClick={handleNextDay}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                  aria-label="Next day"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              
              {/* Simple Date Picker */}
              {isDatePickerOpen && (
                <div className="absolute top-full mt-2 right-0 z-10 p-3 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }, (_, i) => {
                      const date = addDays(new Date(), i - 3)
                      const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                      const isTdy = isToday(date)
                      
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedDate(date)
                            setIsDatePickerOpen(false)
                            handleDateChange(date)
                          }}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                            isSelected ? "bg-blue-600 text-white" : isTdy ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                          }`}
                        >
                          <span className="text-xs font-medium">{format(date, 'EEE')}</span>
                          <span className="text-lg font-semibold">{format(date, 'd')}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-500">Total</div>
            <div className="mt-1 text-2xl font-semibold">{totalStudents}</div>
            <div className="mt-1 text-xs text-gray-500">students</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-500">Present</div>
            <div className="mt-1 text-2xl font-semibold text-green-600">{present}</div>
            <div className="mt-1 text-xs text-gray-500">students</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-500">Absent</div>
            <div className="mt-1 text-2xl font-semibold text-red-600">{absent}</div>
            <div className="mt-1 text-xs text-gray-500">students</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-500">Late</div>
            <div className="mt-1 text-2xl font-semibold text-amber-600">{late}</div>
            <div className="mt-1 text-xs text-gray-500">students</div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-500">Attendance Rate</div>
            <div className="mt-1 text-2xl font-semibold text-blue-600">{attendanceRate}%</div>
            <div className="mt-1 text-xs text-gray-500">of class present</div>
          </div>
        </div>
        
        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Student</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Notes</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="border-b border-gray-200 animate-pulse">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                          <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                      </td>
                    </tr>
                  ))
                ) : students.length > 0 ? (
                  students.map(student => (
                    <StudentRow
                      key={student.id}
                      student={student}
                      onStatusChange={handleStatusChange}
                      onNoteChange={handleNoteChange}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      No students found for this class
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}