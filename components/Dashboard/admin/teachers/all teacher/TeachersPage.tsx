"use client"
import React from 'react';
import DataTable from '@/components/Dashboard/admin/tables/DataTable';
import AnalyticsCard from '@/components/Dashboard/admin/dashboard/AnalyticsCard';
import Chart from '@/components/Dashboard/admin/dashboard/Chart';
import StatCard from '@/components/Dashboard/admin/dashboard/StatCard';
import { 
  GraduationCap, BookOpen, Users, Star, 
  Edit, Trash2, UserPlus, Download, Eye, 
  Award, Clock, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Teacher {
  id: string;
  name: string;
  department: string;
  subject: string;
  experience: string;
  rating: string;
  classes: number;
  students: number;
  status: string;
  joinDate: string;
}

interface TeachersPageProps {
  teachers: Teacher[];
  stats: {
    totalTeachers: number;
    totalDepartments: number;
    avgExperience: string;
    avgRating: string;
  };
  departmentDistribution: { name: string; teachers: number }[];
  experienceDistribution: { name: string; value: number }[];
  classSizeData: { name: string; students: number }[];
}

const columns = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    isSortable: true,
  },
  {
    id: 'department',
    header: 'Department',
    accessorKey: 'department',
    isSortable: true,
    cell: (row:any) => {
      let bgColor = 'bg-blue-100 text-blue-800';
      switch(row.department) {
        case 'Science':
          bgColor = 'bg-blue-100 text-blue-800';
          break;
        case 'Mathematics':
          bgColor = 'bg-purple-100 text-purple-800';
          break;
        case 'English':
          bgColor = 'bg-emerald-100 text-emerald-800';
          break;
        case 'History':
          bgColor = 'bg-amber-100 text-amber-800';
          break;
        case 'Arts':
          bgColor = 'bg-rose-100 text-rose-800';
          break;
        case 'Physical Education':
          bgColor = 'bg-orange-100 text-orange-800';
          break;
        case 'Languages':
          bgColor = 'bg-indigo-100 text-indigo-800';
          break;
        case 'Computer Science':
          bgColor = 'bg-cyan-100 text-cyan-800';
          break;
      }
      return <Badge className={`${bgColor} font-medium`}>{row.department}</Badge>;
    }
  },
  {
    id: 'subject',
    header: 'Subject',
    accessorKey: 'subject',
    isSortable: true,
  },
  {
    id: 'experience',
    header: 'Experience',
    accessorKey: 'experience',
    isSortable: true,
  },
  {
    id: 'rating',
    header: 'Rating',
    accessorKey: 'rating',
    isSortable: true,
    cell: (row:any) => {
      const rating = parseFloat(row.rating);
      let textColor = 'text-slate-700';
      
      if (rating >= 4.7) {
        textColor = 'text-emerald-600 font-medium';
      } else if (rating >= 4.5) {
        textColor = 'text-blue-600';
      }
      
      return (
        <div className="flex items-center">
          <span className={textColor}>{rating}</span>
          <Star className="w-4 h-4 text-amber-400 ml-1 fill-amber-400" />
        </div>
      );
    },
  },
  {
    id: 'classes',
    header: 'Classes',
    accessorKey: 'classes',
    isSortable: true,
  },
  {
    id: 'students',
    header: 'Students',
    accessorKey: 'students',
    isSortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    isSortable: true,
    cell: (row:any) => {
      let badgeColor = 'bg-emerald-100 text-emerald-800';
      
      if (row.status === 'On Leave') {
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
];

const TeachersPage = ({
  teachers,
  stats,
  departmentDistribution,
  experienceDistribution,
  classSizeData
}: TeachersPageProps) => {
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
  };

  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="page-title mb-4 sm:mb-0">Teacher Management</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button className="bg-primary-600 hover:bg-primary-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New Teacher
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
          title="Total Teachers"
          value={stats.totalTeachers.toString()}
          icon={GraduationCap}
          iconColor="bg-blue-100 text-blue-600"
        />
        
        <StatCard
          title="Departments"
          value={stats.totalDepartments.toString()}
          icon={BookOpen}
          iconColor="bg-emerald-100 text-emerald-600"
        />
        
        <StatCard
          title="Avg. Experience"
          value={stats.avgExperience}
          icon={Clock}
          iconColor="bg-amber-100 text-amber-600"
        />
        
        <StatCard
          title="Avg. Rating"
          value={stats.avgRating}
          icon={Star}
          iconColor="bg-indigo-100 text-indigo-600"
        />
      </div>
      
      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <AnalyticsCard 
          title="Department Distribution" 
          className="animate-fade-in [animation-delay:200ms]"
        >
          <Chart
            type="bar"
            data={departmentDistribution}
            xKey="name"
            dataKey="teachers"
            height={220}
            rounded
          />
        </AnalyticsCard>
        
        <AnalyticsCard 
          title="Experience Distribution" 
          className="animate-fade-in [animation-delay:300ms]"
        >
          <Chart
            type="pie"
            data={experienceDistribution}
            xKey="name"
            dataKey="value"
            colors={['#a5b4fc', '#60a5fa', '#3b82f6', '#1d4ed8']}
            height={220}
          />
        </AnalyticsCard>
        
        <AnalyticsCard 
          title="Student Growth" 
          className="animate-fade-in [animation-delay:400ms]"
        >
          <Chart
            type="area"
            data={classSizeData}
            xKey="name"
            dataKey="students"
            height={220}
          />
        </AnalyticsCard>
      </div>
      
      {/* Teachers Table */}
      <DataTable
        columns={columns}
        data={teachers}
        rowActions={rowActions}
        onRowClick={handleRowClick}
        className="animate-fade-in [animation-delay:500ms]"
      />
    </div>
  );
};

export default TeachersPage;