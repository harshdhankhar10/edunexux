"use client"
import React, { useState } from 'react';
import Link from 'next/link'
import { useSession } from 'next-auth/react';

import { usePathname } from 'next/navigation';
import { 
  Users, GraduationCap, Calendar, BarChart, MessageSquare, 
  FolderOpen, ClipboardCheck, DollarSign, Settings, Zap,
  ChevronRight, ChevronLeft, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  subItems?: { title: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard/admin',
    icon: BarChart,
  },
  {
    title: 'Students',
    path: '/dashboard/admin/students',
    icon: Users,
    subItems: [
      { title: 'All Students', path: '/dashboard/admin/students' },
      { title: 'Admissions', path: '/dashboard/admin/students/admissions' },
      { title: 'Student Records', path: '/dashboard/admin/students/records' },
    ],
  },
  {
    title: 'Teachers',
    path: '/dashboard/admin/teachers',
    icon: GraduationCap,
    subItems: [
      { title: 'All Teachers', path: '/dashboard/admin/teachers' },
      { title: 'Departments', path: '/dashboard/admin/teachers/departments' },
      // { title: 'Performance', path: '/teachers/performance' },
    ],
  },
  {
    title: 'Courses',
    path: '/dashboard/admin/courses',
    icon: ClipboardCheck,
    subItems: [
      { title: 'All Courses', path: '/dashboard/admin/courses' },
      { title: 'Curriculum', path: '/dashboard/admin/courses/curriculum' },
      { title: 'Schedule', path: '/dashboard/admin/courses/schedule' },
    ],
  },
  {
    title: 'Attendance',
    path: '/dashboard/admin/attendance',
    icon: Calendar,
    subItems: [
      { title: 'Daily Report', path: '/dashboard/admin/attendance' },
      { title: 'Student Attendance', path: '/dashboard/admin/attendance/students' },
      { title: 'Teacher Attendance', path: '/dashboard/admin/attendance/teachers' },
    ],
  },
  {
    title: 'Communications',
    path: '/communications',
    icon: MessageSquare,
    subItems: [
      { title: 'Announcements', path: '/dashboard/admin/communications' },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: Settings,
    subItems: [
      { title: 'System Settings', path: '/dashboard/admin/settings' },
    ],
  },
];

type SidebarProps = {
  isMobile: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isMobile, isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const location = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpandItem = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  // Check if a path matches the current location
  const isActive = (path: string) => {
    return location === path || location.startsWith(`${path}/`);
  };

  const session = useSession();
  const user = session.data?.user;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 flex flex-col bg-white border-r border-slate-200 shadow-subtle transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          !isMobile && !isSidebarOpen && "w-20"
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
          <div className="flex items-center">
            <div className={cn("flex items-center", !isSidebarOpen && !isMobile && "hidden")}>
              <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center mr-3">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-slate-800">EduAdmin</span>
            </div>
            <div className={cn("hidden", !isSidebarOpen && !isMobile && "block")}>
              <div className="w-10 h-10 rounded-md bg-primary-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            {isMobile ? (
              <X className="w-5 h-5 text-slate-500" />
            ) : (
              isSidebarOpen ? (
                <ChevronLeft className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-500" />
              )
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleExpandItem(item.title)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors",
                        isActive(item.path) ? "bg-primary-50 text-primary-700" : "text-slate-700 hover:bg-slate-100",
                        !isSidebarOpen && !isMobile && "justify-center px-2"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className={cn("w-5 h-5", isActive(item.path) ? "text-primary-600" : "text-slate-500")} />
                        {(isSidebarOpen || isMobile) && (
                          <span className="ml-3 text-sm font-medium">{item.title}</span>
                        )}
                      </div>
                      {(isSidebarOpen || isMobile) && item.subItems && (
                        <ChevronRight className={cn(
                          "w-4 h-4 text-slate-400 transition-transform",
                          expandedItems[item.title] && "transform rotate-90"
                        )} />
                      )}
                    </button>
                    {(isSidebarOpen || isMobile) && expandedItems[item.title] && (
                      <ul className="mt-1 pl-10 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.title}>
                            <Link
                              href={subItem.path}
                              className={cn(
                                "block px-3 py-2 rounded-md text-sm transition-colors",
                                isActive(subItem.path) ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-100"
                              )}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors",
                      isActive(item.path) ? "bg-primary-50 text-primary-700" : "text-slate-700 hover:bg-slate-100",
                      !isSidebarOpen && !isMobile && "justify-center px-2"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive(item.path) ? "text-primary-600" : "text-slate-500")} />
                    {(isSidebarOpen || isMobile) && (
                      <span className="ml-3 text-sm font-medium">{item.title}</span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar footer */}
        {(isSidebarOpen || isMobile) && (
          <div className="flex items-center p-4 border-t border-slate-200">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-700">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
