"use client"
import React from 'react';
import DataTable from '@/components/Dashboard/admin/tables/DataTable';
import AnalyticsCard from '@/components/Dashboard/admin/dashboard/AnalyticsCard';
import Chart from '@/components/Dashboard/admin/dashboard/Chart';
import StatCard from '@/components/Dashboard/admin/dashboard/StatCard';
import { 
  Users, BookOpen, Award, BarChart, 
  Edit, Trash2, UserPlus, Download, Eye, 
  GraduationCap, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  gender: string;
  attendance: string;
  performance: string;
  status: string;
  joinDate: string;
}

interface StudentsPageProps {
  students: Student[];
  stats: {
    totalStudents: number;
    avgAttendance: string;
    avgGrade: string;
    totalClasses: number;
  };
  gradeDistribution: { name: string; students: number }[];
  performanceDistribution: { name: string; value: number }[];
  genderDistribution: { name: string; value: number }[];
}

const columns = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    isSortable: true,
  },
  {
    id: 'grade',
    header: 'Grade',
    accessorKey: 'grade',
    isSortable: true,
  },
  {
    id: 'section',
    header: 'Section',
    accessorKey: 'section',
    isSortable: true,
  },
  {
    id: 'gender',
    header: 'Gender',
    accessorKey: 'gender',
    isSortable: true,
  },
  {
    id: 'attendance',
    header: 'Attendance',
    accessorKey: 'attendance',
    isSortable: true,
    cell: (row: any) => {
      const attendanceValue = parseInt(row.attendance);
      let textColor = 'text-green-600';
      
      if (attendanceValue < 70) {
        textColor = 'text-red-600';
      } else if (attendanceValue < 85) {
        textColor = 'text-amber-600';
      }
      
      return <span className={textColor}>{row.attendance}</span>;
    },
  },
  {
    id: 'performance',
    header: 'Performance',
    accessorKey: 'performance',
    isSortable: true,
    cell: (row: any) => {
      const performance = row.performance;
      let badgeColor = '';
      
      switch (performance) {
        case 'Excellent':
          badgeColor = 'bg-green-100 text-green-800';
          break;
        case 'Very Good':
          badgeColor = 'bg-blue-100 text-blue-800';
          break;
        case 'Good':
          badgeColor = 'bg-indigo-100 text-indigo-800';
          break;
        case 'Average':
          badgeColor = 'bg-amber-100 text-amber-800';
          break;
        case 'Poor':
          badgeColor = 'bg-red-100 text-red-800';
          break;
        default:
          badgeColor = 'bg-slate-100 text-slate-800';
      }
      
      return (
        <Badge className={`${badgeColor} font-medium`}>
          {row.performance}
        </Badge>
      );
    },
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    isSortable: true,
    cell: (row: any) => {
      let badgeColor = 'bg-emerald-100 text-emerald-800';
      
      if (row.status === 'Warning') {
        badgeColor = 'bg-amber-100 text-amber-800';
      } else if (row.status === 'Inactive') {
        badgeColor = 'bg-slate-100 text-slate-800';
      }
      
      return (
        <Badge className={`${badgeColor} font-medium`}>
          {row.status}
        </Badge>
      );
    },
  },
  {
    id: 'joinDate',
    header: 'Join Date',
    accessorKey: 'joinDate',
    isSortable: true,
  },
];

const StudentsPage = ({
  students,
  stats,
  gradeDistribution,
  performanceDistribution,
  genderDistribution
}: StudentsPageProps) => {
  const rowActions = (row: any) => [
    <button key="view" className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
      <Eye className="w-4 h-4 mr-2 text-slate-500" />
      View Profile
    </button>,
    <button key="edit" className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
      <Edit className="w-4 h-4 mr-2 text-slate-500" />
      Edit
    </button>,
    <button key="delete" className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50">
      <Trash2 className="w-4 h-4 mr-2" />
      Delete
    </button>,
  ];

  const handleRowClick = (row: any) => {
    console.log('Row clicked:', row);
    // You can implement navigation to student details here
  };

  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="page-title mb-4 sm:mb-0">Student Management</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button className="bg-primary-600 hover:bg-primary-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New Student
          </Button>
          <Button variant="outline" className="border-slate-200 text-slate-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 animate-fade-in">
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toString()}
          icon={Users}
          iconColor="bg-blue-100 text-blue-600"
        />
        
        <StatCard
          title="Average Attendance"
          value={stats.avgAttendance}
          icon={UserCheck}
          iconColor="bg-emerald-100 text-emerald-600"
        />
        
        <StatCard
          title="Average GPA"
          value={stats.avgGrade}
          icon={Award}
          iconColor="bg-amber-100 text-amber-600"
        />
        
        <StatCard
          title="Total Classes"
          value={stats.totalClasses.toString()}
          icon={BookOpen}
          iconColor="bg-indigo-100 text-indigo-600"
        />
      </div>
      
      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <AnalyticsCard 
          title="Grade Distribution" 
          className="animate-fade-in [animation-delay:200ms]"
        >
          <Chart
            type="bar"
            data={gradeDistribution}
            xKey="name"
            dataKey="students"
            height={220}
            rounded
          />
        </AnalyticsCard>
        
        <AnalyticsCard 
          title="Performance Distribution" 
          className="animate-fade-in [animation-delay:300ms]"
        >
          <Chart
            type="pie"
            data={performanceDistribution}
            xKey="name"
            dataKey="value"
            colors={['#10b981', '#3b82f6', '#6366f1', '#f59e0b', '#ef4444']}
            height={220}
          />
        </AnalyticsCard>
        
        <AnalyticsCard 
          title="Gender Distribution" 
          className="animate-fade-in [animation-delay:400ms]"
        >
          <Chart
            type="pie"
            data={genderDistribution}
            xKey="name"
            dataKey="value"
            colors={['#2563eb', '#ec4899']}
            height={220}
          />
        </AnalyticsCard>
      </div>
      
      {/* Students Table */}
      <DataTable
        columns={columns}
        data={students}
        rowActions={rowActions}
        onRowClick={handleRowClick}
        className="animate-fade-in [animation-delay:500ms]"
      />
    </div>
  );
};

export default StudentsPage;