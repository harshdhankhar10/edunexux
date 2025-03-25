"use client";
import React, { useState } from 'react';
// import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock attendance data for calendar view
const mockAttendanceData = [
  { date: '2023-09-01', status: 'present' },
  { date: '2023-09-02', status: 'present' },
  { date: '2023-09-05', status: 'late', time: '8:45 AM', reason: 'Traffic delay' },
  { date: '2023-09-06', status: 'present' },
  { date: '2023-09-07', status: 'present' },
  { date: '2023-09-08', status: 'present' },
  { date: '2023-09-09', status: 'present' },
  { date: '2023-09-12', status: 'absent', reason: 'Doctor\'s appointment' },
  { date: '2023-09-13', status: 'present' },
  { date: '2023-09-14', status: 'present' },
  { date: '2023-09-15', status: 'present' },
  { date: '2023-09-16', status: 'present' },
  { date: '2023-09-19', status: 'late', time: '8:50 AM', reason: 'School bus delay' },
  { date: '2023-09-20', status: 'present' },
  { date: '2023-09-21', status: 'excused', reason: 'Family emergency' },
  { date: '2023-09-22', status: 'present' },
  { date: '2023-09-23', status: 'present' },
  { date: '2023-09-26', status: 'present' },
  { date: '2023-09-27', status: 'present' },
  { date: '2023-09-28', status: 'present' },
  { date: '2023-09-29', status: 'present' },
  { date: '2023-09-30', status: 'present' }
];

// Stats for the month
const monthlyStats = {
  present: 17,
  absent: 1,
  late: 2,
  excused: 1,
  total: 21,
  presentPercentage: Math.round((17 / 21) * 100)
};

const AttendanceCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 8)); // September 2023
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Generate days for the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-300';
      case 'absent': return 'bg-red-100 text-red-800 border-red-300';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'excused': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'present': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'late': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'excused': return <CalendarIcon className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };
  
  const selectedAttendance = selectedDate ? 
    mockAttendanceData.find(item => item.date === selectedDate) : null;
  
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Calendar</h1>
          <p className="text-gray-600">Monthly calendar showing attendance status</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{format(currentMonth, 'MMMM yyyy')}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={handlePreviousMonth}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Days of the week */}
                <div className="grid grid-cols-7 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                    <div key={i} className="py-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before the first of the month */}
                  {Array.from({ length: getDay(monthStart) }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2 border border-transparent rounded-lg" />
                  ))}
                  
                  {/* Day cells */}
                  {days.map((day) => {
                    const dateString = format(day, 'yyyy-MM-dd');
                    const attendance = mockAttendanceData.find(a => a.date === dateString);
                    
                    return (
                      <button
                        key={dateString}
                        className={cn(
                          "p-2 rounded-lg border text-center min-h-[60px] relative",
                          attendance ? getStatusColor(attendance.status) : "border-gray-200",
                          selectedDate === dateString ? "ring-2 ring-blue-500" : ""
                        )}
                        onClick={() => setSelectedDate(dateString)}
                      >
                        <div className="font-medium">{format(day, 'd')}</div>
                        {attendance && (
                          <div className="mt-1 flex justify-center">
                            {getStatusIcon(attendance.status)}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs">Present</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs">Absent</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-xs">Late</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs">Excused</span>
                  </div>
                </div>
                <Select defaultValue="2023-09">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-09">September 2023</SelectItem>
                    <SelectItem value="2023-08">August 2023</SelectItem>
                    <SelectItem value="2023-07">July 2023</SelectItem>
                    <SelectItem value="2023-06">June 2023</SelectItem>
                    <SelectItem value="2023-05">May 2023</SelectItem>
                  </SelectContent>
                </Select>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance</CardTitle>
                <CardDescription>September 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Present:</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                      {monthlyStats.present} days
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Absent:</span>
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                      {monthlyStats.absent} days
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Late:</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      {monthlyStats.late} days
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Excused:</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                      {monthlyStats.excused} days
                    </Badge>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Attendance Rate:</span>
                      <span className="text-lg font-bold text-green-600">{monthlyStats.presentPercentage}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {selectedAttendance && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {format(new Date(selectedDate!), 'MMMM d, yyyy')}
                  </CardTitle>
                  <CardDescription>Attendance Details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Badge className={cn(
                        selectedAttendance.status === 'present' ? 'bg-green-100 text-green-800' :
                        selectedAttendance.status === 'absent' ? 'bg-red-100 text-red-800' :
                        selectedAttendance.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      )}>
                        {selectedAttendance.status.charAt(0).toUpperCase() + selectedAttendance.status.slice(1)}
                      </Badge>
                      
                      {selectedAttendance.time && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {selectedAttendance.time}
                        </div>
                      )}
                    </div>
                    
                    {selectedAttendance.reason && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Reason:</h4>
                        <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                          {selectedAttendance.reason}
                        </p>
                      </div>
                    )}
                    
                    {selectedAttendance.status === 'absent' && !selectedAttendance.reason!.includes('Doctor') && (
                      <div className="bg-red-50 p-2 rounded text-sm text-red-800">
                        <AlertCircle className="h-4 w-4 inline mr-1" />
                        Absence is unexcused. Please submit documentation for an excused absence.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceCalendar;
