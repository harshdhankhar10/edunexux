"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, description, trend, className }: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight">{value}</h3>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center">
              <span className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-emerald-600" : "text-rose-600"
              )}>
                {trend.isPositive ? "+" : "-"}{trend.value}%
              </span>
              <span className="ml-2 text-xs text-muted-foreground">from last month</span>
            </div>
          )}
        </div>
        <div className="rounded-full p-3 bg-slate-100">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
