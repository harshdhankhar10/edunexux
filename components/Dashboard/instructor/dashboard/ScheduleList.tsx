"use client";
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleItem {
  id: string;
  courseCode?: string;
  courseName?: string;
  title?: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  recurring: boolean;
  type?: string;
}

interface ScheduleListProps {
  items: ScheduleItem[];
  className?: string;
  title?: string;
  description?: string;
}

const ScheduleList = ({
  items,
  className,
  title,
  description,
}: ScheduleListProps) => {
  const getDayColor = (day: string) => {
    switch (day.toLowerCase()) {
      case 'monday':
        return 'bg-blue-100 text-blue-800';
      case 'tuesday':
        return 'bg-purple-100 text-purple-800';
      case 'wednesday':
        return 'bg-green-100 text-green-800';
      case 'thursday':
        return 'bg-amber-100 text-amber-800';
      case 'friday':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeIcon = (type?: string) => {
    if (type === 'meeting') {
      return <div className="h-3 w-3 rounded-full bg-red-500" />;
    } else if (type === 'office-hours') {
      return <div className="h-3 w-3 rounded-full bg-green-500" />;
    }
    return <div className="h-3 w-3 rounded-full bg-blue-500" />;
  };

  return (
    <div className={cn(
      "bg-white p-6 rounded-xl border border-slate-100 shadow-subtle",
      className
    )}>
      {title && (
        <div className="mb-4">
          <h3 className="text-base font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center space-x-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <div className="flex-shrink-0 flex flex-col items-center justify-center">
              <span className={cn(
                "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium",
                getDayColor(item.day)
              )}>
                {item.day.charAt(0)}
              </span>
              {getTypeIcon(item.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">
                {item.title || `${item.courseCode}: ${item.courseName}`}
              </h4>
              
              <div className="mt-1 flex flex-wrap gap-y-1 gap-x-3">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{item.startTime} - {item.endTime}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span>{item.room}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
