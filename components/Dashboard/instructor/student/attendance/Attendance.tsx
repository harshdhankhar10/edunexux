"use client"
import React, { useState, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, Check, Clock, Ban, FileX, HelpCircle, Download, Printer, RefreshCw, ChevronsUpDown } from 'lucide-react';
import { toast } from 'sonner';

// Define Types
type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | 'pending';

interface Student {
  id: string;
  name: string;
  avatar?: string;
  status: AttendanceStatus;
  note?: string;
}

interface Class {
  id: string;
  name: string;
}

// All components in one file
const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>('class-1');
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isClassSelectorOpen, setIsClassSelectorOpen] = useState(false);
  
  // Sample class data
  const classes: Class[] = [
    { id: 'class-1', name: 'Mathematics 101' },
    { id: 'class-2', name: 'Physics 202' },
    { id: 'class-3', name: 'Computer Science 303' },
    { id: 'class-4', name: 'Chemistry 404' },
    { id: 'class-5', name: 'Biology 505' },
  ];
  
  // Sample student data
  const sampleStudents: Record<string, Student[]> = {
    'class-1': [
      { id: 's1', name: 'Alex Johnson', status: 'present', note: 'Participated actively' },
      { id: 's2', name: 'Maria Garcia', status: 'present', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 's3', name: 'James Smith', status: 'absent', note: 'Called in sick' },
      { id: 's4', name: 'Sarah Williams', status: 'late', note: 'Arrived 15 minutes late', avatar: 'https://i.pravatar.cc/150?img=13' },
      { id: 's5', name: 'Daniel Brown', status: 'excused', note: 'Doctor appointment' },
      { id: 's6', name: 'Sophia Miller', status: 'present', avatar: 'https://i.pravatar.cc/150?img=20' },
      { id: 's7', name: 'Ethan Davis', status: 'pending' },
      { id: 's8', name: 'Olivia Martinez', status: 'present', avatar: 'https://i.pravatar.cc/150?img=29' },
    ],
    'class-2': [
      { id: 's10', name: 'Emma Wilson', status: 'present', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 's11', name: 'Noah Thompson', status: 'late', note: 'Bus was delayed' },
      { id: 's12', name: 'Isabella Anderson', status: 'absent', note: 'Family emergency', avatar: 'https://i.pravatar.cc/150?img=23' },
      { id: 's13', name: 'Lucas Thomas', status: 'present' },
    ],
    'class-3': [
      { id: 's20', name: 'Charlotte Jackson', status: 'present', avatar: 'https://i.pravatar.cc/150?img=9' },
      { id: 's21', name: 'Henry White', status: 'excused', note: 'School competition' },
      { id: 's22', name: 'Amelia Harris', status: 'absent', avatar: 'https://i.pravatar.cc/150?img=18' },
      { id: 's23', name: 'Benjamin Martin', status: 'present' },
      { id: 's24', name: 'Mia Thompson', status: 'late', note: 'Traffic jam', avatar: 'https://i.pravatar.cc/150?img=25' },
    ],
    'class-4': [
      { id: 's30', name: 'William Lee', status: 'present' },
      { id: 's31', name: 'Harper Clark', status: 'present', avatar: 'https://i.pravatar.cc/150?img=10' },
      { id: 's32', name: 'Evelyn Lewis', status: 'absent', note: 'No call, no show' },
    ],
    'class-5': [
      { id: 's40', name: 'Mason Walker', status: 'present' },
      { id: 's41', name: 'Abigail Hall', status: 'present', avatar: 'https://i.pravatar.cc/150?img=7' },
      { id: 's42', name: 'Elijah Allen', status: 'excused', note: 'School event' },
      { id: 's43', name: 'Ava Young', status: 'late', avatar: 'https://i.pravatar.cc/150?img=15' },
      { id: 's44', name: 'Liam King', status: 'present' },
      { id: 's45', name: 'Elizabeth Wright', status: 'pending', avatar: 'https://i.pravatar.cc/150?img=27' },
    ],
  };
  
  // Load students when class or date changes
  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      // Simulate API request
      setTimeout(() => {
        setStudents(sampleStudents[selectedClass] || []);
        setIsLoading(false);
      }, 800);
    };
    
    loadStudents();
  }, [selectedClass, selectedDate]);
  
  // Handle status change
  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStudents(currentStudents => 
      currentStudents.map(student => 
        student.id === studentId ? { ...student, status } : student
      )
    );
    
    // Show toast notification
    toast(`${students.find(s => s.id === studentId)?.name} marked as ${status}`, {
      description: `Updated on ${format(selectedDate, 'MMMM d, yyyy')}`,
    });
  };
  
  // Handle note change
  const handleNoteChange = (studentId: string, note: string) => {
    setStudents(currentStudents => 
      currentStudents.map(student => 
        student.id === studentId ? { ...student, note } : student
      )
    );
  };
  
  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      toast("Attendance data refreshed", {
        description: `Updated at ${format(new Date(), 'h:mm a')}`,
      });
      setIsLoading(false);
    }, 1000);
  };

  const handlePreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };
  
  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Calculate attendance statistics
  const totalStudents = students.length;
  const present = students.filter(s => s.status === 'present').length;
  const absent = students.filter(s => s.status === 'absent').length;
  const late = students.filter(s => s.status === 'late').length;
  const excused = students.filter(s => s.status === 'excused').length;
  const pending = students.filter(s => s.status === 'pending').length;
  
  const attendanceRate = totalStudents > 0 
    ? Math.round(((present + late) / totalStudents) * 100) 
    : 0;
  
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
    const baseClasses = "font-medium rounded-full transition-all duration-300 ease-out select-none";
    
    const sizeClasses = {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-3 py-1",
      lg: "text-base px-4 py-1.5"
    };
    
    const statusClasses = {
      present: "bg-green-100 text-green-800 border border-green-200",
      absent: "bg-red-100 text-red-800 border border-red-200",
      late: "bg-amber-100 text-amber-800 border border-amber-200",
      excused: "bg-blue-100 text-blue-800 border border-blue-200",
      pending: "bg-gray-100 text-gray-800 border border-gray-200"
    };

    const hoverClasses = onClick ? {
      present: "hover:bg-green-200 hover:border-green-300 cursor-pointer",
      absent: "hover:bg-red-200 hover:border-red-300 cursor-pointer",
      late: "hover:bg-amber-200 hover:border-amber-300 cursor-pointer",
      excused: "hover:bg-blue-200 hover:border-blue-300 cursor-pointer",
      pending: "hover:bg-gray-200 hover:border-gray-300 cursor-pointer"
    } : {};

    const statusLabels = {
      present: "Present",
      absent: "Absent",
      late: "Late",
      excused: "Excused",
      pending: "Pending"
    };

    const classes = [
      baseClasses,
      sizeClasses[size],
      statusClasses[status],
      hoverClasses[status] || "",
      className
    ].join(' ');

    return (
      <span 
        className={classes}
        onClick={() => onClick && onClick(status)}
      >
        {statusLabels[status]}
      </span>
    );
  };

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
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [note, setNote] = useState(student.note || '');
    
    const statusIcons = {
      present: <Check className="h-5 w-5 text-green-600" />,
      absent: <Ban className="h-5 w-5 text-red-600" />,
      late: <Clock className="h-5 w-5 text-amber-600" />,
      excused: <FileX className="h-5 w-5 text-blue-600" />,
      pending: <HelpCircle className="h-5 w-5 text-gray-400" />
    };
    
    const handleStatusClick = (status: AttendanceStatus) => {
      onStatusChange(student.id, status);
    };
    
    const handleNoteSubmit = () => {
      onNoteChange(student.id, note);
      setIsEditingNote(false);
    };

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
            {['present', 'absent', 'late', 'excused'].map((status) => (
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
    );
  };

  // Action button component
  const ActionButton = ({ 
    icon, 
    label, 
    onClick 
  }: { 
    icon: React.ReactNode; 
    label: string; 
    onClick?: () => void;
  }) => (
    <button
      onClick={onClick}
      className="flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  // Class selector
  const ClassSelector = () => {
    const selectedClassName = classes.find(c => c.id === selectedClass)?.name || 'Select Class';

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
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  className={`relative flex cursor-pointer select-none items-center rounded-md px-3 py-2.5 transition-colors duration-200 ease-out ${
                    selectedClass === classItem.id 
                      ? "bg-blue-50 text-blue-900" 
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setSelectedClass(classItem.id);
                    setIsClassSelectorOpen(false);
                  }}
                >
                  <span className="font-medium">{classItem.name}</span>
                  {selectedClass === classItem.id && (
                    <Check className="ml-auto h-4 w-4 text-blue-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

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
                      const date = addDays(new Date(), i - 3);
                      const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                      const isTdy = isToday(date);
                      
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedDate(date);
                            setIsDatePickerOpen(false);
                          }}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                            isSelected ? "bg-blue-600 text-white" : isTdy ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                          }`}
                        >
                          <span className="text-xs font-medium">{format(date, 'EEE')}</span>
                          <span className="text-lg font-semibold">{format(date, 'd')}</span>
                        </button>
                      );
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
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex flex-wrap gap-3 mb-4 lg:mb-0">
            <ActionButton 
              icon={<Download className="h-4 w-4" />} 
              label="Export CSV" 
            />
            <ActionButton 
              icon={<Printer className="h-4 w-4" />} 
              label="Print" 
            />
            <ActionButton 
              icon={<RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />} 
              label={isLoading ? "Refreshing..." : "Refresh"} 
              onClick={handleRefresh}
            />
          </div>
          
          <div className="text-sm text-gray-500">
            {pending > 0 ? (
              <span className="text-amber-600 font-medium">{pending} students pending attendance</span>
            ) : (
              <span className="text-green-600 font-medium">All students marked</span>
            )}
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
  );
};

export default Attendance;