
import React from 'react';
import { Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { attendanceStats, attendanceData } from '@/components/Dashboard/parent/data/mockData';

const AttendanceChart: React.FC = () => {
  const attendancePieData = [
    { name: 'Present', value: attendanceStats.present, color: '#34D399' },
    { name: 'Absent', value: attendanceStats.absent, color: '#F87171' },
    { name: 'Late', value: attendanceStats.late, color: '#FBBF24' },
    { name: 'Excused', value: attendanceStats.excused, color: '#60A5FA' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'late':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'excused':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow lg:col-span-1">
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
          <CardDescription>Summary of attendance this term</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendancePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent! * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {attendancePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [value, 'Days']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '0.5rem', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {attendancePieData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-600">{item.name}: {item.value} days</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Last 10 school days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-100">
            {attendanceData.map((record, index) => (
              <div key={index} className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    {getStatusIcon(record.status)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formatDate(record.date)}</p>
                    <p className="text-xs text-gray-500">
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </p>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  record.status === 'present' ? 'bg-green-100 text-green-800' :
                  record.status === 'absent' ? 'bg-red-100 text-red-800' :
                  record.status === 'late' ? 'bg-amber-100 text-amber-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceChart;
