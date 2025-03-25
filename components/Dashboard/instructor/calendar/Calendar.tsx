"use client"
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  List, 
  Plus, 
  Search
} from 'lucide-react';
// import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { teachingSchedule } from '@/components/Dashboard/instructor/data/mockData';

// Mock calendar events
const calendarEvents = [
  {
    id: 'ev1',
    title: 'CS 101 Lecture',
    date: new Date(2023, 9, 16), // Oct 16, 2023
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    location: 'Tech Hall 305',
    type: 'class'
  },
  {
    id: 'ev2',
    title: 'Office Hours',
    date: new Date(2023, 9, 16), // Oct 16, 2023
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    location: 'Science Building, Room 305',
    type: 'office-hours'
  },
  {
    id: 'ev3',
    title: 'CS 230 Midterm Exam',
    date: new Date(2023, 9, 18), // Oct 18, 2023
    startTime: '2:00 PM',
    endTime: '3:30 PM',
    location: 'Science Center 110',
    type: 'exam'
  },
  {
    id: 'ev4',
    title: 'Department Meeting',
    date: new Date(2023, 9, 20), // Oct 20, 2023
    startTime: '1:00 PM',
    endTime: '2:00 PM',
    location: 'Admin Building 105',
    type: 'meeting'
  },
  {
    id: 'ev5',
    title: 'CS 450 Lecture',
    date: new Date(2023, 9, 23), // Oct 23, 2023
    startTime: '3:30 PM',
    endTime: '5:00 PM',
    location: 'Tech Hall 201',
    type: 'class'
  },
  {
    id: 'ev6',
    title: 'CS 101 Assignment Due',
    date: new Date(2023, 9, 25), // Oct 25, 2023
    allDay: true,
    type: 'deadline'
  }
];

// Helper functions
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'class':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'office-hours':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'exam':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'meeting':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'deadline':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  
  // Generate events for the current month based on teaching schedule
  const generateRecurringEvents = () => {
    const recurringEvents : any = [];
    const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
      
      // Find all schedule items for this day of the week
      const scheduleItems = teachingSchedule.filter(item => item.day === currentDayOfWeek);
      
      // Create events for each schedule item
      scheduleItems.forEach(item => {
        recurringEvents.push({
          id: `rec-${item.id}-${currentDate.toISOString()}`,
          title: item.courseCode ? `${item.courseCode}: ${item.courseName}` : item.title,
          date: new Date(currentDate),
          startTime: item.startTime,
          endTime: item.endTime,
          location: item.room,
          type: item.type || 'class',
          recurring: true
        });
      });
    }
    
    return recurringEvents;
  };
  
  // Combine one-time events with recurring events
  const allEvents = [...calendarEvents, ...generateRecurringEvents()];
  
  // Filter events for the selected date in day view
  const dayEvents = allEvents.filter(event => 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );
  
  // Filter events for the selected week in week view
  const getWeekDates = () => {
    const selectedDate = new Date(date);
    const day = selectedDate.getDay();
    const diff = selectedDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust for starting on Monday
    
    const weekStart = new Date(selectedDate.setDate(diff));
    const weekDates = [];
    
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(weekStart);
      newDate.setDate(weekStart.getDate() + i);
      weekDates.push(newDate);
    }
    
    return weekDates;
  };
  
  const weekDates = getWeekDates();
  
  // Get week events
  const weekEvents = allEvents.filter(event => {
    return weekDates.some(weekDate => 
      event.date.getDate() === weekDate.getDate() &&
      event.date.getMonth() === weekDate.getMonth() &&
      event.date.getFullYear() === weekDate.getFullYear()
    );
  });
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Calendar</h1>
            <p className="text-slate-600 mt-1">Manage your schedule and events</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => {
                const newDate = new Date(date);
                newDate.setMonth(newDate.getMonth() - 1);
                setDate(newDate);
              }}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
                <CalendarIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => {
                const newDate = new Date(date);
                newDate.setMonth(newDate.getMonth() + 1);
                setDate(newDate);
              }}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex border rounded-md">
              <Button 
                variant={view === 'month' ? 'default' : 'ghost'} 
                size="sm" 
                className="rounded-r-none"
                onClick={() => setView('month')}
              >
                <Grid className="h-4 w-4 mr-2" />
                Month
              </Button>
              <Button 
                variant={view === 'week' ? 'default' : 'ghost'} 
                size="sm" 
                className="rounded-none border-x"
                onClick={() => setView('week')}
              >
                <List className="h-4 w-4 mr-2" />
                Week
              </Button>
              <Button 
                variant={view === 'day' ? 'default' : 'ghost'} 
                size="sm" 
                className="rounded-l-none"
                onClick={() => setView('day')}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Day
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-8 w-full md:w-[200px]" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onDayClick={setDate}
                  className="p-3 pointer-events-auto"
                  disabled={{
                    before: new Date(date.getFullYear(), date.getMonth() - 3, 1),
                    after: new Date(date.getFullYear(), date.getMonth() + 3, 0)
                  }}
                />
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Customize your calendar view</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Type</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200" variant="outline">
                        Classes
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200" variant="outline">
                        Office Hours
                      </Badge>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200" variant="outline">
                        Exams
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200" variant="outline">
                        Meetings
                      </Badge>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200" variant="outline">
                        Deadlines
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Courses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="cs101">CS 101</SelectItem>
                        <SelectItem value="cs230">CS 230</SelectItem>
                        <SelectItem value="cs450">CS 450</SelectItem>
                        <SelectItem value="cs375">CS 375</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {allEvents
                    .filter(event => {
                      const eventDate = new Date(event.date);
                      const today = new Date();
                      const sevenDaysFromNow = new Date();
                      sevenDaysFromNow.setDate(today.getDate() + 7);
                      return eventDate >= today && eventDate <= sevenDaysFromNow;
                    })
                    .slice(0, 5)
                    .map(event => (
                      <div key={event.id} className="p-3 hover:bg-slate-50">
                        <div className="flex items-start">
                          <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                            event.type === 'class' ? 'bg-blue-500' :
                            event.type === 'exam' ? 'bg-red-500' :
                            event.type === 'meeting' ? 'bg-purple-500' :
                            event.type === 'office-hours' ? 'bg-green-500' :
                            'bg-amber-500'
                          }`} />
                          <div className="ml-2 flex-1">
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(event.date)}{event.allDay ? ' (All day)' : `, ${event.startTime} - ${event.endTime}`}
                            </p>
                            {event.location && (
                              <p className="text-xs text-muted-foreground">{event.location}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>
                  {view === 'month' && date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  {view === 'week' && (
                    <>
                      {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
                      {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </>
                  )}
                  {view === 'day' && date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </CardTitle>
                <CardDescription>
                  {view === 'month' && 'Monthly overview of your schedule'}
                  {view === 'week' && 'Weekly view of your events and classes'}
                  {view === 'day' && `${dayEvents.length} events scheduled for today`}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue="calendar" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="calendar">
                    {view === 'month' && (
                      <div className="grid grid-cols-7 gap-0 border rounded-md">
                        {/* Days of the week header */}
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                          <div key={day} className="p-2 text-center text-sm font-medium border-b">
                            {day}
                          </div>
                        ))}
                        
                        {/* Calendar cells */}
                        {Array.from({ length: 35 }).map((_, index) => {
                          const firstDayOfMonth = getFirstDayOfMonth(date.getFullYear(), date.getMonth());
                          const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday start
                          const day = index - adjustedFirstDay + 1;
                          const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
                          const isCurrentMonth = day > 0 && day <= getDaysInMonth(date.getFullYear(), date.getMonth());
                          const isToday = new Date().toDateString() === currentDate.toDateString();
                          
                          // Get events for this day
                          const dayEvents = isCurrentMonth ? allEvents.filter(event => 
                            event.date.getDate() === currentDate.getDate() &&
                            event.date.getMonth() === currentDate.getMonth() &&
                            event.date.getFullYear() === currentDate.getFullYear()
                          ) : [];
                          
                          return (
                            <div 
                              key={index} 
                              className={`h-24 p-1 border overflow-hidden ${
                                isCurrentMonth ? 'bg-white' : 'bg-slate-50 text-slate-400'
                              } ${isToday ? 'ring-2 ring-primary ring-inset' : ''}`}
                            >
                              <div className="text-right mb-1">
                                <span className={`inline-block w-6 h-6 text-center ${
                                  isToday ? 'bg-primary text-white rounded-full' : ''
                                }`}>
                                  {isCurrentMonth ? day : ''}
                                </span>
                              </div>
                              <div className="space-y-1 overflow-hidden">
                                {dayEvents.slice(0, 3).map((event, eventIndex) => (
                                  <div 
                                    key={eventIndex} 
                                    className={`text-xs px-1 py-0.5 rounded truncate ${getEventTypeColor(event.type)}`}
                                  >
                                    {event.allDay ? (
                                      <span className="font-medium">{event.title}</span>
                                    ) : (
                                      <>
                                        <span className="font-medium">{event.startTime}</span> {event.title}
                                      </>
                                    )}
                                  </div>
                                ))}
                                {dayEvents.length > 3 && (
                                  <div className="text-xs text-center text-primary">
                                    +{dayEvents.length - 3} more
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {view === 'week' && (
                      <div className="border rounded-md">
                        <div className="grid grid-cols-8 border-b">
                          <div className="p-2 text-center border-r"></div>
                          {weekDates.map((date, i) => (
                            <div 
                              key={i} 
                              className={`p-2 text-center border-r last:border-r-0 ${
                                new Date().toDateString() === date.toDateString() ? 'bg-primary/5' : ''
                              }`}
                            >
                              <div className="font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                              <div className={`h-7 w-7 rounded-full mx-auto flex items-center justify-center ${
                                new Date().toDateString() === date.toDateString() ? 'bg-primary text-primary-foreground' : ''
                              }`}>
                                {date.getDate()}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-8">
                          <div className="border-r">
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div key={i} className="h-16 px-2 text-xs text-right border-b last:border-b-0">
                                {i + 8}:00
                              </div>
                            ))}
                          </div>
                          
                          {weekDates.map((date, dateIndex) => {
                            const dayEvents = allEvents.filter(event => 
                              event.date.getDate() === date.getDate() &&
                              event.date.getMonth() === date.getMonth() &&
                              event.date.getFullYear() === date.getFullYear() &&
                              !event.allDay
                            );
                            
                            return (
                              <div key={dateIndex} className="relative h-[576px] border-r last:border-r-0">
                                {Array.from({ length: 12 }).map((_, i) => (
                                  <div key={i} className="h-16 border-b last:border-b-0"></div>
                                ))}
                                
                                {dayEvents.map((event, eventIndex) => {
                                  const startHour = parseInt(event.startTime.split(':')[0]) + 
                                                   (event.startTime.includes('PM') && !event.startTime.startsWith('12') ? 12 : 0);
                                  const startMinutes = parseInt(event.startTime.split(':')[1].split(' ')[0]);
                                  const startTime = startHour - 8 + (startMinutes / 60);
                                  
                                  const endHour = parseInt(event.endTime.split(':')[0]) + 
                                                 (event.endTime.includes('PM') && !event.endTime.startsWith('12') ? 12 : 0);
                                  const endMinutes = parseInt(event.endTime.split(':')[1].split(' ')[0]);
                                  const endTime = endHour - 8 + (endMinutes / 60);
                                  
                                  const duration = endTime - startTime;
                                  
                                  return (
                                    <div 
                                      key={eventIndex}
                                      className={`absolute left-0.5 right-0.5 rounded px-1.5 py-1 text-xs ${getEventTypeColor(event.type)}`}
                                      style={{
                                        top: `${startTime * 4}rem`,
                                        height: `${duration * 4}rem`,
                                        overflow: 'hidden'
                                      }}
                                    >
                                      <div className="font-medium truncate">{event.title}</div>
                                      <div className="truncate">{event.startTime} - {event.endTime}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {view === 'day' && (
                      <div className="border rounded-md">
                        <div className="p-3 bg-primary/5 border-b text-center">
                          <span className="font-medium">{dayEvents.length} events</span> on {date.toLocaleDateString('en-US', { 
                            weekday: 'long', month: 'long', day: 'numeric'
                          })}
                        </div>
                        
                        {dayEvents.length === 0 ? (
                          <div className="p-8 text-center">
                            <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-2" />
                            <h3 className="text-lg font-medium">No Events Scheduled</h3>
                            <p className="text-muted-foreground mb-4">
                              There are no events scheduled for this day.
                            </p>
                            <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Event
                            </Button>
                          </div>
                        ) : (
                          <div className="divide-y">
                            {dayEvents
                              .sort((a, b) => {
                                if (a.allDay && !b.allDay) return -1;
                                if (!a.allDay && b.allDay) return 1;
                                if (a.allDay && b.allDay) return 0;
                                
                                const aTime = a.startTime;
                                const bTime = b.startTime;
                                const aHour = parseInt(aTime.split(':')[0]) + (aTime.includes('PM') && !aTime.startsWith('12') ? 12 : 0);
                                const bHour = parseInt(bTime.split(':')[0]) + (bTime.includes('PM') && !bTime.startsWith('12') ? 12 : 0);
                                
                                if (aHour !== bHour) return aHour - bHour;
                                
                                const aMinute = parseInt(aTime.split(':')[1].split(' ')[0]);
                                const bMinute = parseInt(bTime.split(':')[1].split(' ')[0]);
                                return aMinute - bMinute;
                              })
                              .map((event, index) => (
                                <div key={index} className="p-4 hover:bg-slate-50">
                                  <div className="flex">
                                    {!event.allDay && (
                                      <div className="w-24 flex-shrink-0 font-medium">
                                        {event.startTime}
                                      </div>
                                    )}
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-2 ${
                                          event.type === 'class' ? 'bg-blue-500' :
                                          event.type === 'exam' ? 'bg-red-500' :
                                          event.type === 'meeting' ? 'bg-purple-500' :
                                          event.type === 'office-hours' ? 'bg-green-500' :
                                          'bg-amber-500'
                                        }`} />
                                        <h3 className="font-medium">{event.title}</h3>
                                        {event.allDay && (
                                          <Badge variant="outline" className="ml-2">All Day</Badge>
                                        )}
                                      </div>
                                      {!event.allDay && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {event.startTime} - {event.endTime}
                                        </p>
                                      )}
                                      {event.location && (
                                        <p className="text-sm text-muted-foreground">
                                          {event.location}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="schedule">
                    <div className="border rounded-md divide-y">
                      {view === 'day' ? (
                        dayEvents.length > 0 ? (
                          dayEvents
                            .sort((a, b) => {
                              if (a.allDay && !b.allDay) return -1;
                              if (!a.allDay && b.allDay) return 1;
                              if (a.allDay && b.allDay) return 0;
                              
                              const aTime = a.startTime;
                              const bTime = b.startTime;
                              const aHour = parseInt(aTime.split(':')[0]);
                              const bHour = parseInt(bTime.split(':')[0]);
                              
                              if (aHour !== bHour) return aHour - bHour;
                              
                              const aMinute = parseInt(aTime.split(':')[1].split(' ')[0]);
                              const bMinute = parseInt(bTime.split(':')[1].split(' ')[0]);
                              return aMinute - bMinute;
                            })
                            .map((event, index) => (
                              <div key={index} className="p-4 hover:bg-slate-50">
                                <div className="flex items-start">
                                  {!event.allDay && (
                                    <div className="w-20 flex-shrink-0 font-medium">
                                      {event.startTime}
                                    </div>
                                  )}
                                  <div className={`w-1 self-stretch mx-3 rounded ${
                                    event.type === 'class' ? 'bg-blue-500' :
                                    event.type === 'exam' ? 'bg-red-500' :
                                    event.type === 'meeting' ? 'bg-purple-500' :
                                    event.type === 'office-hours' ? 'bg-green-500' :
                                    'bg-amber-500'
                                  }`} />
                                  <div className="flex-1">
                                    <h3 className="font-medium">{event.title}</h3>
                                    {!event.allDay ? (
                                      <p className="text-sm text-muted-foreground">
                                        {event.startTime} - {event.endTime}
                                      </p>
                                    ) : (
                                      <Badge variant="outline">All Day</Badge>
                                    )}
                                    {event.location && (
                                      <p className="text-sm text-muted-foreground">
                                        {event.location}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                        ) : (
                          <div className="p-8 text-center">
                            <p className="text-muted-foreground">No events scheduled for this day</p>
                          </div>
                        )
                      ) : view === 'week' ? (
                        weekDates.map((date, dateIndex) => {
                          const dayEvents = allEvents.filter(event => 
                            event.date.getDate() === date.getDate() &&
                            event.date.getMonth() === date.getMonth() &&
                            event.date.getFullYear() === date.getFullYear()
                          );
                          
                          return (
                            <div key={dateIndex}>
                              <div className="p-3 bg-slate-50 font-medium">
                                {date.toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </div>
                              {dayEvents.length > 0 ? (
                                dayEvents.map((event, eventIndex) => (
                                  <div key={eventIndex} className="p-4 hover:bg-slate-50">
                                    <div className="flex items-start">
                                      <div className="w-20 flex-shrink-0 font-medium">
                                        {event.allDay ? 'All Day' : event.startTime}
                                      </div>
                                      <div className={`w-1 self-stretch mx-3 rounded ${
                                        event.type === 'class' ? 'bg-blue-500' :
                                        event.type === 'exam' ? 'bg-red-500' :
                                        event.type === 'meeting' ? 'bg-purple-500' :
                                        event.type === 'office-hours' ? 'bg-green-500' :
                                        'bg-amber-500'
                                      }`} />
                                      <div className="flex-1">
                                        <h3 className="font-medium">{event.title}</h3>
                                        {!event.allDay && (
                                          <p className="text-sm text-muted-foreground">
                                            {event.startTime} - {event.endTime}
                                          </p>
                                        )}
                                        {event.location && (
                                          <p className="text-sm text-muted-foreground">
                                            {event.location}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="p-4 text-center">
                                  <p className="text-muted-foreground">No events scheduled</p>
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-muted-foreground">Please select day or week view to see schedule</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
