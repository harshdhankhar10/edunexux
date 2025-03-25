"use client"

import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { navigationItems } from '@/components/Dashboard/instructor/data/mockData';
import { teacherProfile } from '@/components/Dashboard/instructor/data/mockData';
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
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleExpandItem = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };
  
  // Check if a path is active (exact match or starts with path for parent routes)
  const isActive = (path: string) => {
    if (path === '/') {
      return location === '/';
    }
    return location.startsWith(path);
  };
  
  // Check if any subitem is active
  const hasActiveSubItem = (subItems: any[]) => {
    return subItems?.some(item => isActive(item.path));
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/dashboard/teacher" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              TeachMatic
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.slice(0, 6).map((item) => (
            <div key={item.title} className="relative group">
              <Link 
                href={`/dashboard/teacher/${item.path}`}
                className={`nav-item ${isActive(item.path) || (item.subItems && hasActiveSubItem(item.subItems)) ? 'active' : ''}`}
              >
                <span className="flex items-center">
                  {item.title}
                  {item.subItems && (
                    <ChevronDown className="ml-1 h-4 w-4 text-current opacity-60" />
                  )}
                </span>
              </Link>
              
              {item.subItems && (
                <div className="absolute left-0 mt-1 w-48 hidden group-hover:block animate-fade-in">
                  <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={`/dashboard/teacher/${subItem.path}`}
                        className={`block px-4 py-2 text-sm ${
                          isActive(subItem.path) 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-gray-700 hover:bg-gray-100'
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
              <Button variant="ghost" size="sm" className="ml-2 text-sm font-medium">
                More
                <ChevronDown className="ml-1 h-4 w-4 text-current opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navigationItems.slice(6).map((item) => (
                <React.Fragment key={item.title}>
                  {item.subItems ? (
                    <>
                      <DropdownMenuLabel className="font-normal">
                        <Link 
                          href={item.path}
                          className="flex items-center justify-between w-full"
                        >
                          {item.title}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                    </>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href={item.path} className="w-full">
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  )}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button className="hidden md:flex items-center h-9 w-9 justify-center rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors">
            <Search className="h-4 w-4" />
          </button>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative h-9 w-9 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* We'd map through notifications here */}
              <div className="py-2 px-4 text-sm text-muted-foreground">
                <p className="font-medium">New assignment submission</p>
                <p className="text-xs">Emma Johnson submitted Assignment #4</p>
                <p className="text-xs mt-1 text-muted-foreground">2 minutes ago</p>
              </div>
              <DropdownMenuSeparator />
              <div className="py-2 px-4 text-sm text-muted-foreground">
                <p className="font-medium">Class reminder</p>
                <p className="text-xs">CS 101 starts in 15 minutes</p>
                <p className="text-xs mt-1 text-muted-foreground">15 minutes ago</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Quick Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors">
                <Calendar className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Upcoming</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-2 px-4 text-sm">
                <p className="font-medium">CS 101 Lecture</p>
                <p className="text-xs text-muted-foreground">Today, 10:00 AM</p>
              </div>
              <DropdownMenuSeparator />
              <div className="py-2 px-4 text-sm">
                <p className="font-medium">Department Meeting</p>
                <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                <Link href="/dashboard/teacher/calendar" className="w-full text-center">
                  View calendar
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Messages */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors">
                <MessageSquare className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Messages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-2 px-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://randomuser.me/api/portraits/women/1.jpg" />
                    <AvatarFallback>EJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Emma Johnson</p>
                    <p className="text-xs truncate">Can you clarify the assignment requirements?</p>
                    <p className="text-xs mt-1 text-muted-foreground">5 min ago</p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="py-2 px-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/2.jpg" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-xs truncate">Thank you for the feedback on my project</p>
                    <p className="text-xs mt-1 text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                <Link href="/communication/messages" className="w-full text-center">
                  View all messages
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={teacherProfile.avatar} alt={teacherProfile.name} />
                  <AvatarFallback>{teacherProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex text-sm font-medium">
                  {teacherProfile.name.split(' ')[0]}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{teacherProfile.name}</p>
                  <p className="text-xs text-muted-foreground">{teacherProfile.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden h-9 w-9 flex items-center justify-center"
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
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto py-2 px-4">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div 
                    className={`flex justify-between items-center py-2 px-3 rounded-md ${
                      isActive(item.path) ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                    }`}
                    onClick={() => item.subItems && toggleExpandItem(item.title)}
                  >
                    <Link 
                      href={item.path}
                      className="flex-1 text-sm font-medium"
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
                  
                  {/* Sub-items */}
                  {item.subItems && expandedItems.includes(item.title) && (
                    <div className="pl-4 space-y-1 mt-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.path}
                          className={`block py-2 px-3 rounded-md text-sm ${
                            isActive(subItem.path) 
                              ? 'bg-primary/10 text-primary' 
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
        </div>
      )}
    </header>
  );
};

export default Header;
