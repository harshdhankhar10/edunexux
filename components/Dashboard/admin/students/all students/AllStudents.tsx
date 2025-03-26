"use client"
import React from 'react';
// import DashboardLayout from '@/components/layout/DashboardLayout';
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

// Sample student data
const studentsData = [
  {
    id: 1,
    name: 'Emma Wilson',
    grade: '10th',
    section: 'A',
    gender: 'Female',
    attendance: '95%',
    performance: 'Excellent',
    status: 'Active',
    joinDate: '12/08/2022',
  },
  {
    id: 2,
    name: 'James Miller',
    grade: '11th',
    section: 'B',
    gender: 'Male',
    attendance: '87%',
    performance: 'Good',
    status: 'Active',
    joinDate: '05/15/2021',
  },
  {
    id: 3,
    name: 'Sophia Johnson',
    grade: '9th',
    section: 'C',
    gender: 'Female',
    attendance: '92%',
    performance: 'Very Good',
    status: 'Active',
    joinDate: '09/03/2023',
  },
  {
    id: 4,
    name: 'Noah Brown',
    grade: '12th',
    section: 'A',
    gender: 'Male',
    attendance: '78%',
    performance: 'Average',
    status: 'Warning',
    joinDate: '02/20/2020',
  },
  {
    id: 5,
    name: 'Olivia Davis',
    grade: '10th',
    section: 'B',
    gender: 'Female',
    attendance: '98%',
    performance: 'Excellent',
    status: 'Active',
    joinDate: '01/14/2022',
  },
  {
    id: 6,
    name: 'Liam Garcia',
    grade: '11th',
    section: 'A',
    gender: 'Male',
    attendance: '85%',
    performance: 'Good',
    status: 'Active',
    joinDate: '08/25/2021',
  },
  {
    id: 7,
    name: 'Ava Martinez',
    grade: '9th',
    section: 'B',
    gender: 'Female',
    attendance: '90%',
    performance: 'Very Good',
    status: 'Active',
    joinDate: '07/19/2023',
  },
  {
    id: 8,
    name: 'William Rodriguez',
    grade: '12th',
    section: 'C',
    gender: 'Male',
    attendance: '75%',
    performance: 'Average',
    status: 'Warning',
    joinDate: '11/05/2020',
  },
  {
    id: 9,
    name: 'Isabella Lopez',
    grade: '10th',
    section: 'A',
    gender: 'Female',
    attendance: '94%',
    performance: 'Very Good',
    status: 'Active',
    joinDate: '03/30/2022',
  },
  {
    id: 10,
    name: 'Mason Lee',
    grade: '11th',
    section: 'B',
    gender: 'Male',
    attendance: '88%',
    performance: 'Good',
    status: 'Active',
    joinDate: '06/12/2021',
  },
  {
    id: 11,
    name: 'Charlotte Hall',
    grade: '9th',
    section: 'C',
    gender: 'Female',
    attendance: '91%',
    performance: 'Very Good',
    status: 'Active',
    joinDate: '09/15/2023',
  },
  {
    id: 12,
    name: 'Ethan Wright',
    grade: '12th',
    section: 'A',
    gender: 'Male',
    attendance: '74%',
    performance: 'Average',
    status: 'Inactive',
    joinDate: '05/08/2020',
  },
];

// Sample chart data
const gradeDistributionData = [
  { name: '9th', students: 325 },
  { name: '10th', students: 378 },
  { name: '11th', students: 280 },
  { name: '12th', students: 262 },
];

const performanceData = [
  { name: 'Excellent', value: 35 },
  { name: 'Very Good', value: 40 },
  { name: 'Good', value: 15 },
  { name: 'Average', value: 8 },
  { name: 'Poor', value: 2 },
];

const genderData = [
  { name: 'Male', value: 48 },
  { name: 'Female', value: 52 },
];

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
    cell: (row:any) => {
      const attendanceValue = parseInt(row.attendance);
      let textColor = 'text-green-600';
      
      if (attendanceValue < 80) {
        textColor = 'text-red-600';
      } else if (attendanceValue < 90) {
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
    cell: (row:any) => {
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
    cell: (row:any) => {
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

const StudentsPage = () => {
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
    // <Dashboard>
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
            value="1,245"
            icon={Users}
            iconColor="bg-blue-100 text-blue-600"
          />
          
          <StatCard
            title="Average Attendance"
            value="92%"
            icon={UserCheck}
            iconColor="bg-emerald-100 text-emerald-600"
          />
          
          <StatCard
            title="Average GPA"
            value="3.65"
            icon={Award}
            iconColor="bg-amber-100 text-amber-600"
          />
          
          <StatCard
            title="Total Classes"
            value="48"
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
              data={gradeDistributionData}
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
              data={performanceData}
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
              data={genderData}
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
          data={studentsData}
          rowActions={rowActions}
          onRowClick={handleRowClick}
          className="animate-fade-in [animation-delay:500ms]"
        />
      </div>
    // </Dashboard/Layout>
  );
};

export default StudentsPage;
