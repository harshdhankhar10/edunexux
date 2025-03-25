"use client"

import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from 'next-auth/react';
import { 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Search,
  Settings,
  LogOut,
  User,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { teacherProfile, navigationItems } from '@/components/Dashboard/instructor/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = usePathname();
  const session = useSession();
  const userinfo = session.data?.user;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleExpandItem = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };
  
  const isActive = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };
  
  const hasActiveSubItem = (subItems: any[]) => {
    return subItems?.some(item => isActive(item.path));
  };

  const handleLogout = async ()=>{
    await signOut();
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard/instructor" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">TeachMatic</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.slice(0, 6).map((item) => (
              <div key={item.title} className="relative group">
                <Link 
                  href={`/dashboard/instructor/${item.path}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200 ${
                    isActive(item.path) || (item.subItems && hasActiveSubItem(item.subItems)) 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.title}
                  {item.subItems && (
                    <ChevronDown className="ml-1 h-4 w-4 text-current opacity-60 group-hover:rotate-180 transition-transform" />
                  )}
                </Link>
                
                {item.subItems && (
                  <div className="absolute left-0 mt-1 w-56 hidden group-hover:block animate-fade-in">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={`/dashboard/instructor/${subItem.path}`}
                          className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive(subItem.path) 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  More
                  <ChevronDown className="ml-1 h-4 w-4 text-current opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border border-gray-100 shadow-xl rounded-lg">
                {navigationItems.slice(6).map((item) => (
                  <React.Fragment key={item.title}>
                    {item.subItems ? (
                      <>
                        <DropdownMenuLabel className="font-medium px-3 py-2 text-gray-700">
                          <Link href={item.path} className="flex items-center justify-between w-full">
                            {item.title}
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-100" />
                      </>
                    ) : (
                      <DropdownMenuItem asChild className="px-3 py-2.5 hover:bg-blue-50 focus:bg-blue-50">
                        <Link href={item.path} className="w-full text-gray-700 hover:text-blue-600">
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center space-x-3">

            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative hidden md:flex items-center justify-center h-9 w-9 rounded-full bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm border border-gray-200">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 border border-gray-100 shadow-xl rounded-lg">
                <DropdownMenuLabel className="font-medium px-4 py-3 border-b border-gray-100">Notifications</DropdownMenuLabel>
                <div className="py-2 px-4 text-sm hover:bg-blue-50 transition-colors cursor-pointer">
                  <p className="font-medium text-gray-800">New assignment submission</p>
                  <p className="text-gray-500">Emma Johnson submitted Assignment #4</p>
                  <p className="text-xs mt-1 text-gray-400">2 minutes ago</p>
                </div>
                <div className="py-2 px-4 text-sm hover:bg-blue-50 transition-colors cursor-pointer">
                  <p className="font-medium text-gray-800">Class reminder</p>
                  <p className="text-gray-500">CS 101 starts in 15 minutes</p>
                  <p className="text-xs mt-1 text-gray-400">15 minutes ago</p>
                </div>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="justify-center text-blue-600 font-medium px-4 py-2 hover:bg-blue-50">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex items-center justify-center h-9 w-9 rounded-full bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm border border-gray-200">
                  <Calendar className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border border-gray-100 shadow-xl rounded-lg">
                <DropdownMenuLabel className="font-medium px-4 py-3 border-b border-gray-100">Upcoming</DropdownMenuLabel>
                <div className="py-2 px-4 text-sm hover:bg-blue-50 transition-colors cursor-pointer">
                  <p className="font-medium text-gray-800">CS 101 Lecture</p>
                  <p className="text-gray-500">Today, 10:00 AM</p>
                </div>
                <div className="py-2 px-4 text-sm hover:bg-blue-50 transition-colors cursor-pointer">
                  <p className="font-medium text-gray-800">Department Meeting</p>
                  <p className="text-gray-500">Today, 2:00 PM</p>
                </div>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="justify-center text-blue-600 font-medium px-4 py-2 hover:bg-blue-50">
                  <Link href="/dashboard/instructor/calendar" className="w-full text-center">
                    View calendar
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex items-center justify-center h-9 w-9 rounded-full bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm border border-gray-200">
                  <MessageSquare className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 border border-gray-100 shadow-xl rounded-lg">
                <DropdownMenuLabel className="font-medium px-4 py-3 border-b border-gray-100">Messages</DropdownMenuLabel>
                <div className="py-3 px-4 text-sm hover:bg-blue-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://randomuser.me/api/portraits/women/1.jpg" />
                      <AvatarFallback>EJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-800">Emma Johnson</p>
                      <p className="text-gray-500 truncate">Can you clarify the assignment requirements?</p>
                      <p className="text-xs mt-1 text-gray-400">5 min ago</p>
                    </div>
                  </div>
                </div>
                <div className="py-3 px-4 text-sm hover:bg-blue-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/2.jpg" />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-800">Michael Chen</p>
                      <p className="text-gray-500 truncate">Thank you for the feedback on my project</p>
                      <p className="text-xs mt-1 text-gray-400">Yesterday</p>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="justify-center text-blue-600 font-medium px-4 py-2 hover:bg-blue-50">
                  <Link href="/communication/messages" className="w-full text-center">
                    View all messages
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 focus:outline-none">
                  <Avatar className="h-9 w-9 border-2 border-blue-100 hover:border-blue-200 transition-colors">
                    <AvatarImage src={userinfo?.profilePicture} alt={userinfo?.firstName} />
                    <AvatarFallback>{userinfo?.firstName.charAt(0)} </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex text-sm font-medium text-gray-700">
                    {userinfo?.firstName}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border border-gray-100 shadow-xl rounded-lg">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-100">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userinfo?.profilePicture} alt={userinfo?.firstName} />
                    <AvatarFallback>{userinfo?.firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-800">{userinfo?.firstName} {userinfo?.lastName} </p>
                    <p className="text-xs text-gray-500">{userinfo?.email}</p>
                  </div>
                </div>
                <DropdownMenuItem className="px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem onClick={handleLogout}
                 className="px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button 
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-full bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm border border-gray-200"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => (
              <div key={item.title}>
                <div 
                  className={`flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path) ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  onClick={() => item.subItems && toggleExpandItem(item.title)}
                >
                  <Link 
                    href={item.path}
                    className="flex-1"
                    onClick={(e) => item.subItems && e.preventDefault()}
                  >
                    {item.title}
                  </Link>
                  {item.subItems && (
                    <button 
                      className="h-5 w-5 flex items-center justify-center"
                      onClick={() => toggleExpandItem(item.title)}
                    >
                      {expandedItems.includes(item.title) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
                
                {item.subItems && expandedItems.includes(item.title) && (
                  <div className="pl-4 space-y-1 mt-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.path}
                        className={`block px-3 py-2 rounded-md text-sm font-medium ${
                          isActive(subItem.path) 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;