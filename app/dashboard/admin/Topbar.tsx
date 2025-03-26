"use client"
import { useState } from 'react';
import { Bell, Search, Menu, User, Settings, LogOut, Calendar, MessageSquare } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type TopbarProps = {
  toggleSidebar: () => void;
};

const Topbar = ({ toggleSidebar }: TopbarProps) => {
  const session = useSession();
  const user = session.data?.user;
  const [searchQuery, setSearchQuery] = useState('');
  
  const notifications = [
    { id: 1, title: 'New student registration', time: '10 min ago', read: false },
    { id: 2, title: 'Staff meeting reminder', time: '1 hour ago', read: false },
    { id: 3, title: 'System update scheduled', time: '3 hours ago', read: true },
    { id: 4, title: 'Curriculum update completed', time: 'Yesterday', read: true },
  ];

  const userMenuItems = [
    { label: 'My Profile', icon: User, action: () => console.log('Profile clicked') },
    { label: 'Calendar', icon: Calendar, action: () => console.log('Calendar clicked') },
    { label: 'Messages', icon: MessageSquare, action: () => console.log('Messages clicked') },
    { label: 'Settings', icon: Settings, action: () => console.log('Settings clicked') },
    { label: 'Logout', icon: LogOut, action: () => console.log('Logout clicked') },
  ];

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Search */}
        <div className="hidden md:flex items-center ml-4 bg-slate-50 rounded-md border border-slate-200 px-3 py-1.5 w-64 lg:w-80">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-2 flex-1 bg-transparent text-sm outline-none text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="px-4 py-3 border-b border-slate-100">
              <h3 className="text-sm font-medium text-slate-700">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={cn(
                    "px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer",
                    !notification.read && "bg-primary-50"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-slate-700">{notification.title}</p>
                    {!notification.read && <span className="w-2 h-2 rounded-full bg-primary-600"></span>}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100">
              <button className="w-full text-center text-xs font-medium text-primary-600 hover:text-primary-700">
                View all notifications
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User menu */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center space-x-2 group">
              <div className="overflow-hidden rounded-full w-8 h-8 bg-slate-200 flex-shrink-0 border-2 border-transparent group-hover:border-primary-100 transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-700 leading-tight">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-56 p-0">
            <div className="p-3 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-700">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <div className="py-1">
              {userMenuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className={cn(
                    "w-full text-left px-4 py-2 flex items-center text-sm text-slate-700 hover:bg-slate-50",
                    index === userMenuItems.length - 1 && "border-t border-slate-100 mt-1 pt-1"
                  )}
                >
                  <item.icon className="w-4 h-4 mr-3 text-slate-500" />
                  {item.label}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Topbar;
