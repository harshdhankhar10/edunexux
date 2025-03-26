"use client";
import React from 'react';
import { IconType } from 'react-icons';

interface StatCardProps {
  title: string;
  value: number;
  icon: IconType;
  className?: string;
  description?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  className = '', 
  description = '' 
}: StatCardProps) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-900">
            {value.toLocaleString()}
          </h3>
          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;