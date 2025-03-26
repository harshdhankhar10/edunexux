"use client"
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

type AnalyticsCardProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  fullHeight?: boolean;
};

const AnalyticsCard = ({ 
  title, 
  children, 
  className,
  actions,
  fullHeight = false
}: AnalyticsCardProps) => {
  return (
    <div className={cn(
      "dashboard-card",
      fullHeight && "h-full flex flex-col",
      className
    )}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 className="font-medium text-slate-800">{title}</h3>
        {actions ? (
          actions
        ) : (
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div className={cn(
        "p-6", 
        fullHeight && "flex-1"
      )}>
        {children}
      </div>
    </div>
  );
};

export default AnalyticsCard;
