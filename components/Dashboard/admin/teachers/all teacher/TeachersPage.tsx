"use client"
import React from 'react';
// import DashboardLayout from '@/components/layout/DashboardLayout';
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

// Sample teacher data
const teachersData = [
  {
    id: 1,
    name: 'Dr. Robert Chen',
    department: 'Science',
    subject: 'Physics',
    experience: '12 years',
    rating: 4.8,
    classes: 4,
    students: 125,
    status: 'Active',
    joinDate: '05/10/2012',
  },
  {
    id: 2,
    name: 'Ms. Sarah Johnson',
    department: 'Mathematics',
    subject: 'Algebra',
    experience: '8 years',
    rating: 4.7,
    classes: 5,
    students: 150,
    status: 'Active',
    joinDate: '08/22/2015',
  },
  {
    id: 3,
    name: 'Mr. Michael Williams',
    department: 'English',
    subject: 'Literature',
    experience: '15 years',
    rating: 4.6,
    classes: 3,
    students: 90,
    status: 'Active',
    joinDate: '02/14/2008',
  },
  {
    id: 4,
    name: 'Mrs. Jennifer Davis',
    department: 'History',
    subject: 'World History',
    experience: '10 years',
    rating: 4.5,
    classes: 4,
    students: 120,
    status: 'Active',
    joinDate: '09/03/2013',
  },
  {
    id: 5,
    name: 'Dr. David Martinez',
    department: 'Science',
    subject: 'Chemistry',
    experience: '14 years',
    rating: 4.9,
    classes: 4,
    students: 130,
    status: 'Active',
    joinDate: '07/17/2009',
  },
  {
    id: 6,
    name: 'Ms. Lisa Taylor',
    department: 'Arts',
    subject: 'Fine Arts',
    experience: '7 years',
    rating: 4.4,
    classes: 3,
    students: 85,
    status: 'On Leave',
    joinDate: '04/05/2016',
  },
  {
    id: 7,
    name: 'Mr. James Anderson',
    department: 'Physical Education',
    subject: 'Sports',
    experience: '9 years',
    rating: 4.6,
    classes: 6,
    students: 180,
    status: 'Active',
    joinDate: '03/12/2014',
  },
  {
    id: 8,
    name: 'Mrs. Elizabeth Wilson',
    department: 'Mathematics',
    subject: 'Calculus',
    experience: '11 years',
    rating: 4.7,
    classes: 4,
    students: 120,
    status: 'Active',
    joinDate: '01/20/2012',
  },
  {
    id: 9,
    name: 'Dr. Thomas Brown',
    department: 'Science',
    subject: 'Biology',
    experience: '16 years',
    rating: 4.8,
    classes: 3,
    students: 95,
    status: 'Active',
    joinDate: '06/08/2007',
  },
  {
    id: 10,
    name: 'Ms. Patricia Garcia',
    department: 'Languages',
    subject: 'Spanish',
    experience: '6 years',
    rating: 4.5,
    classes: 5,
    students: 140,
    status: 'Active',
    joinDate: '09/15/2017',
  },
  {
    id: 11,
    name: 'Mr. Richard Lee',
    department: 'Computer Science',
    subject: 'Programming',
    experience: '8 years',
    rating: 4.7,
    classes: 4,
    students: 110,
    status: 'Active',
    joinDate: '05/22/2015',
  },
  {
    id: 12,
    name: 'Mrs. Mary Rodriguez',
    department: 'English',
    subject: 'Grammar',
    experience: '13 years',
    rating: 4.6,
    classes: 3,
    students: 95,
    status: 'Inactive',
    joinDate: '11/04/2010',
  },
];

// Sample chart data
const departmentData = [
  { name: 'Science', teachers: 12 },
  { name: 'Mathematics', teachers: 10 },
  { name: 'English', teachers: 8 },
  { name: 'History', teachers: 6 },
  { name: 'Arts', teachers: 5 },
  { name: 'Physical Ed', teachers: 4 },
  { name: 'Languages', teachers: 3 },
  { name: 'Computer Sci', teachers: 3 },
];

const experienceData = [
  { name: '0-5 yrs', value: 20 },
  { name: '6-10 yrs', value: 35 },
  { name: '11-15 yrs', value: 30 },
  { name: '16+ yrs', value: 15 },
];

const classSizeData = [
  { name: 'Jan', students: 1050 },
  { name: 'Feb', students: 1080 },
  { name: 'Mar', students: 1120 },
  { name: 'Apr', students: 1150 },
  { name: 'May', students: 1200 },
  { name: 'Jun', students: 1245 },
];

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

const TeachersPage = () => {
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
    // <DashboardLayout>
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
            value="86"
            icon={GraduationCap}
            iconColor="bg-blue-100 text-blue-600"
          />
          
          <StatCard
            title="Departments"
            value="8"
            icon={BookOpen}
            iconColor="bg-emerald-100 text-emerald-600"
          />
          
          <StatCard
            title="Avg. Experience"
            value="9.5 yrs"
            icon={Clock}
            iconColor="bg-amber-100 text-amber-600"
          />
          
          <StatCard
            title="Avg. Rating"
            value="4.7"
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
              data={departmentData}
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
              data={experienceData}
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
          data={teachersData}
          rowActions={rowActions}
          onRowClick={handleRowClick}
          className="animate-fade-in [animation-delay:500ms]"
        />
      </div>
    // </DashboardLayout>
  );
};

export default TeachersPage;
