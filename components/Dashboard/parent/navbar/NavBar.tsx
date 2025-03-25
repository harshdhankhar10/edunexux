"use client";
import React, { useState } from 'react';
import Link from 'next/link'
import { Bell, Calendar, ChevronDown, Home,SquareGanttChartIcon, MessageSquare, PieChart, Users } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-blue-500 text-white p-1.5 rounded">
                <Users className="h-5 w-5" />
              </span>
              <span className="text-xl font-bold text-gray-800">ParentView</span>
            </Link>
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/dashboard/parent" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard/parent/timetable" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500">
                  <SquareGanttChartIcon className="mr-2 h-4 w-4" />
                  Time Table
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-blue-500">
                  <PieChart className="mr-2 h-4 w-4" />
                  Performance
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link href="/dashboard/parent/performance" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-600 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Performance Overview</div>
                          <p className="text-sm leading-tight text-white/90">
                            Comprehensive view of your child's academic performance
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem to="/dashboard/parent/performance/grades" title="Grades">
                      View detailed grade reports across all subjects
                    </ListItem>
                    <ListItem to="/dashboard/parent/performance/progress" title="Progress Reports">
                      Track improvement and areas needing attention
                    </ListItem>
                    <ListItem to="/dashboard/parent/performance/assessments" title="Assessments">
                      Review test scores and assessment results
                    </ListItem>
                    <ListItem to="/dashboard/parent/performance/comparison" title="Class Comparison">
                      See how your child compares to class averages
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-blue-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  Attendance
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link href="/dashboard/parent/attendance" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-600 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Attendance Tracking</div>
                          <p className="text-sm leading-tight text-white/90">
                            Monitor your child's attendance records and patterns
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem to="/dashboard/parent/attendance/calendar" title="Calendar View">
                      Monthly calendar showing attendance status
                    </ListItem>
                    <ListItem to="/dashboard/parent/attendance/history" title="Attendance History">
                      Complete record of attendance over time
                    </ListItem>
                    <ListItem to="/dashboard/parent/attendance/report" title="Attendance Reports">
                      Detailed reports and statistics
                    </ListItem>
                    <ListItem to="/dashboard/parent/attendance/excused" title="Submit Absence Excuse">
                      Provide documentation for absences
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-blue-500">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link href="/dashboard/parent/messages" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-600 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Communication Center</div>
                          <p className="text-sm leading-tight text-white/90">
                            Connect with teachers and administrators easily
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem to="/dashboard/parent/messages/inbox" title="Inbox">
                      View and manage received messages
                    </ListItem>
                    <ListItem to="/dashboard/parent/messages/sent" title="Sent Messages">
                      Track messages you've sent
                    </ListItem>
                    <ListItem to="/dashboard/parent/messages/compose" title="Compose Message">
                      Write new messages to teachers
                    </ListItem>
                    <ListItem to="/dashboard/parent/messages/announcements" title="School Announcements">
                      Important updates from the school
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-blue-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  Meetings
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link href="/dashboard/parent/meetings" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-600 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Meeting Scheduler</div>
                          <p className="text-sm leading-tight text-white/90">
                            Schedule and manage appointments with teachers
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem to="/dashboard/parent/meetings/schedule" title="Schedule Meeting">
                      Book new appointments with teachers
                    </ListItem>
                    <ListItem to="/dashboard/parent/meetings/upcoming" title="Upcoming Meetings">
                      View your scheduled meetings
                    </ListItem>
                    <ListItem to="/dashboard/parent/meetings/reschedule" title="Reschedule">
                      Change the date or time of meetings
                    </ListItem>
                    <ListItem to="/dashboard/parent/meetings/history" title="Meeting History">
                      Past meetings and notes
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-500 hover:text-blue-500 relative"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

          <Link href="/dashboard/parent/profile" >
          <div className="flex items-center space-x-2">
              <img 
                src="https://i.pravatar.cc/150?img=11" 
                alt="Parent" 
                className="h-8 w-8 rounded-full"
              />
              <div className="hidden md:flex flex-col text-sm">
                <span className="font-medium text-gray-800">Jane Johnson</span>
                <span className="text-gray-500 text-xs">Parent</span>
              </div>
            </div>
          </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { to: string; title: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={to}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50 focus:text-blue-500",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
