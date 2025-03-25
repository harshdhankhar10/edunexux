"use client";
import React from 'react';
import { currentClasses } from '@/components/Dashboard/instructor/data/mockData';
import CourseCard from '@/components/Dashboard/instructor/dashboard/CourseCard';

const CurrentClasses = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-slate-900">Current Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentClasses.slice(0, 3).map((course) => (
          <CourseCard 
            key={course.id}
            id={course.id}
            courseCode={course.courseCode}
            courseName={course.courseName}
            students={course.students}
            progress={course.progress}
            nextClass={course.nextClass}
            room={course.room}
            className="animate-fade-up [animation-delay:150ms]"
          />
        ))}
      </div>
      {currentClasses.length > 3 && (
        <div className="mt-4 text-center">
          <a href="/courses" className="text-primary hover:text-primary/80 text-sm font-medium">
            View all {currentClasses.length} courses →
          </a>
        </div>
      )}
    </div>
  );
};

export default CurrentClasses;
