"use client";
import React from 'react';
import Link from 'next/link';
import { Clock, MapPin, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  id: string;
  courseCode: string;
  courseName: string;
  students: number;
  progress: number;
  nextClass: string;
  room: string;
  className?: string;
}

const CourseCard = ({
  id,
  courseCode,
  courseName,
  students,
  progress,
  nextClass,
  room,
  className,
}: CourseCardProps) => {
  return (
    <Link
      href={`/courses/${id}`}
      className={cn(
        "block bg-white rounded-xl border border-slate-100 overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {courseCode}
            </span>
            <h3 className="mt-2 text-lg font-semibold line-clamp-2">{courseName}</h3>
            
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              <span>{students} Students</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-muted-foreground">Course Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1.5 h-4 w-4" />
            <span>{nextClass}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1.5 h-4 w-4" />
            <span>{room}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
