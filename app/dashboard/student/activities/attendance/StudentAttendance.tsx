"use client"
import { useState, useMemo } from 'react'
import { Calendar, Clock, CheckCircle, XCircle, Filter, ChevronDown, Search, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format, subDays, isWithinInterval, parseISO } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Calendar as CalendarPicker } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface ClassItem {
  time: string
  course: string
  department: string
  status: string
  color: string
  textColor: string
}

interface DaySchedule {
  day: string
  date: string
  dateObj: Date
  classes: ClassItem[]
}

interface StudentAttendanceProps {
  weeklyTimetable: DaySchedule[]
  departments: string[]
  defaultStartDate: Date
}

export default function StudentAttendance({ 
  weeklyTimetable,
  departments,
  defaultStartDate
}: StudentAttendanceProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: defaultStartDate,
    to: new Date()
  })
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Filter the timetable based on all criteria
  const filteredTimetable = useMemo(() => {
    return weeklyTimetable.filter(day => {
      // Filter by date range
      if (dateRange?.from && dateRange?.to) {
        const dayDate = day.dateObj
        if (!isWithinInterval(dayDate, { start: dateRange.from, end: dateRange.to })) {
          return false
        }
      }

      // Filter classes within each day
      const filteredClasses = day.classes.filter(cls => {
        // Filter by search query
        if (searchQuery && !cls.course.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false
        }
        
        // Filter by department
        if (selectedDepartment !== 'all' && cls.department !== selectedDepartment) {
          return false
        }
        
        // Filter by status
        if (selectedStatus !== 'all' && cls.status !== selectedStatus) {
          return false
        }
        
        return true
      })

      // Only include days that have matching classes
      return filteredClasses.length > 0
    })
  }, [weeklyTimetable, searchQuery, selectedDepartment, selectedStatus, dateRange])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return <CheckCircle className="h-3 w-3 mr-1" />
      case 'ABSENT':
        return <XCircle className="h-3 w-3 mr-1" />
      case 'LATE':
        return <Clock className="h-3 w-3 mr-1" />
      default:
        return <Clock className="h-3 w-3 mr-1" />
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-emerald-50 text-emerald-600'
      case 'ABSENT':
        return 'bg-red-50 text-red-600'
      case 'LATE':
        return 'bg-amber-50 text-amber-600'
      case 'EXCUSED':
        return 'bg-blue-50 text-blue-600'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedDepartment('all')
    setSelectedStatus('all')
    setDateRange({
      from: defaultStartDate,
      to: new Date()
    })
  }

  const activeFilterCount = [
    searchQuery,
    selectedDepartment !== 'all',
    selectedStatus !== 'all',
    dateRange?.from !== defaultStartDate || dateRange?.to !== new Date()
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="pt-20 md:pt-24 container mx-auto">
        <div className="mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Attendance
              </h1>
              <p className="mt-1 text-gray-600">
                View your class attendance records
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search classes..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {activeFilterCount}
                      </Badge>
                    )}
                    {isFiltersOpen ? (
                      <ChevronUp className="h-4 w-4 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-2" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] md:w-[400px] p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Date Range</h3>
                      <CalendarPicker
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        className="rounded-md border"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Department</h3>
                      <Select 
                        value={selectedDepartment} 
                        onValueChange={setSelectedDepartment}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Status</h3>
                      <Select 
                        value={selectedStatus} 
                        onValueChange={setSelectedStatus}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="PRESENT">Present</SelectItem>
                          <SelectItem value="ABSENT">Absent</SelectItem>
                          <SelectItem value="LATE">Late</SelectItem>
                          <SelectItem value="EXCUSED">Excused</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end pt-2">
                      <Button 
                        variant="ghost" 
                        onClick={clearFilters}
                        className="text-sm"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Applied filters summary */}
        {(searchQuery || selectedDepartment !== 'all' || selectedStatus !== 'all' || 
          (dateRange?.from !== defaultStartDate || dateRange?.to !== new Date())) && (
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Filters:</span>
            {searchQuery && (
              <Badge variant="outline" className="text-sm">
                Search: "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedDepartment !== 'all' && (
              <Badge variant="outline" className="text-sm">
                Department: {selectedDepartment}
                <button 
                  onClick={() => setSelectedDepartment('all')} 
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedStatus !== 'all' && (
              <Badge variant="outline" className="text-sm">
                Status: {selectedStatus}
                <button 
                  onClick={() => setSelectedStatus('all')} 
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </Badge>
            )}
            {dateRange?.from && dateRange?.to && 
              (dateRange.from !== defaultStartDate || dateRange.to !== new Date()) && (
              <Badge variant="outline" className="text-sm">
                Date: {format(dateRange.from, 'MMM d')} - {format(dateRange.to, 'MMM d, y')}
                <button 
                  onClick={() => setDateRange({
                    from: defaultStartDate,
                    to: new Date()
                  })} 
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}

        <Card className="rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Day</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Classes</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimetable.length > 0 ? (
                  filteredTimetable.map((day) => (
                    <tr key={`${day.day}-${day.date}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{day.day}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{day.date}</td>
                      <td className="px-4 py-4">
                        <div className="space-y-2">
                          {day.classes.map((cls, index) => (
                            <div
                              key={`${day.date}-${index}`}
                              className={`p-3 rounded-lg ${cls.color} ${cls.textColor} flex items-center justify-between`}
                            >
                              <div className="flex items-center space-x-3">
                                <Clock className="h-4 w-4 flex-shrink-0" />
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                                  <span className="font-medium">{cls.time}</span>
                                  <span className="font-semibold">{cls.course}</span>
                                  {cls.department && (
                                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                      {cls.department}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(cls.status)}`}>
                                {getStatusIcon(cls.status)}
                                {cls.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                      No attendance records match your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}