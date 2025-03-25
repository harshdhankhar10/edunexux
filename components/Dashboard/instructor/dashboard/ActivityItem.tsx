"use client"
import React from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  Users, 
  FileText, 
  Bell,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItemProps {
  type: string;
  course: string;
  title: string;
  timestamp: string;
  description: string;
  className?: string;
}

const ActivityItem = ({
  type,
  course,
  title,
  timestamp,
  description,
  className,
}: ActivityItemProps) => {
  // Map activity type to icon
  const getIcon = () => {
    switch (type) {
      case 'assignment':
        return <FileText className="h-5 w-5" />;
      case 'message':
        return <MessageSquare className="h-5 w-5" />;
      case 'attendance':
        return <Users className="h-5 w-5" />;
      case 'material':
        return <BookOpen className="h-5 w-5" />;
      case 'announcement':
        return <Bell className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };
  
  // Map activity type to background color
  const getBgColor = () => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-100 text-blue-800';
      case 'message':
        return 'bg-purple-100 text-purple-800';
      case 'attendance':
        return 'bg-green-100 text-green-800';
      case 'material':
        return 'bg-amber-100 text-amber-800';
      case 'announcement':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn(
      "flex items-start space-x-4 p-4 rounded-lg border border-slate-100 bg-white hover:shadow-subtle transition-all duration-200",
      className
    )}>
      <div className={cn(
        "flex-shrink-0 rounded-full p-2",
        getBgColor()
      )}>
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium rounded-full px-2 py-0.5 bg-slate-100">
            {course}
          </span>
          <span className="text-xs text-muted-foreground">
            {timestamp}
          </span>
        </div>
        
        <h4 className="mt-1 text-sm font-medium truncate">{title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
