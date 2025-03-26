"use client"
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  trendText?: string;
  className?: string;
  iconColor?: string;
};

const StatCard = ({ 
  title, 
  value, 
  icon: Icon,
  trend, 
  trendText, 
  className,
  iconColor = "bg-primary-100 text-primary-600"
}: StatCardProps) => {
  return (
    <div className={cn(
      "dashboard-card p-6 animate-bounce-in", 
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1 text-slate-800">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span 
                className={cn(
                  "flex items-center text-xs font-medium",
                  trend.isPositive ? "text-emerald-600" : "text-rose-600"
                )}
              >
                {trend.isPositive ? (
                  <ArrowUp className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDown className="w-3 h-3 mr-1" />
                )}
                {trend.value}%
              </span>
              {trendText && (
                <span className="text-xs text-slate-500 ml-1">
                  {trendText}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          iconColor
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
