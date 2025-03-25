"use client";
import React from 'react';
import { AlertCircle, Calendar, Clock, FileText, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface DeadlineItemProps {
  course: string;
  title: string;
  dueDate: string;
  type: string;
  submissions?: number;
  totalStudents?: number;
  room?: string;
  duration?: string;
  className?: string;
}

const DeadlineItem = ({
  course,
  title,
  dueDate,
  type,
  submissions,
  totalStudents,
  room,
  duration,
  className,
}: DeadlineItemProps) => {
  // Get icon based on deadline type
  const getIcon = () => {
    switch (type) {
      case 'assignment':
        return <FileText className="h-5 w-5" />;
      case 'exam':
        return <AlertCircle className="h-5 w-5" />;
      case 'project':
        return <GraduationCap className="h-5 w-5" />;
      case 'lab':
        return <Clock className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };
  
  // Get background color based on deadline type
  const getBgColor = () => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-100 text-blue-800';
      case 'exam':
        return 'bg-red-100 text-red-800';
      case 'project':
        return 'bg-purple-100 text-purple-800';
      case 'lab':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Calculate days remaining
  const getDaysRemaining = () => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = Math.abs(due.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysRemaining = getDaysRemaining();
  const isUrgent = daysRemaining <= 2;

  return (
    <div className={cn(
      "p-4 bg-white border border-slate-100 rounded-lg hover:shadow-subtle transition-all duration-200",
      className
    )}>
      <div className="flex items-start space-x-4">
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
            <span className={cn(
              "text-xs font-medium",
              isUrgent ? "text-red-600" : "text-muted-foreground"
            )}>
              {dueDate}
            </span>
          </div>
          
          <h4 className="mt-1 text-sm font-medium">{title}</h4>
          
          {/* Display different information based on deadline type */}
          {(type === 'assignment' || type === 'project' || type === 'lab') && submissions !== undefined && totalStudents !== undefined && (
            <div className="mt-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-muted-foreground">Submissions</span>
                <span className="font-medium">{submissions} / {totalStudents}</span>
              </div>
              <Progress 
                value={(submissions / totalStudents) * 100} 
                className="h-1.5" 
              />
            </div>
          )}
          
          {type === 'exam' && room && duration && (
            <div className="mt-2 text-xs text-muted-foreground space-y-1">
              <div className="flex items-center">
                <Clock className="mr-1.5 h-3.5 w-3.5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1.5 h-3.5 w-3.5" />
                <span>{room}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeadlineItem;
