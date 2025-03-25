"use client";
import React, { useState } from 'react';
// import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, FileText, Download } from 'lucide-react';
import { format, parseISO } from 'date-fns';

// Mock comprehensive attendance history
const historyData = [
  { id: 1, date: '2023-09-30', status: 'present', checkIn: '7:52 AM', checkOut: '3:05 PM' },
  { id: 2, date: '2023-09-29', status: 'present', checkIn: '7:55 AM', checkOut: '3:02 PM' },
  { id: 3, date: '2023-09-28', status: 'present', checkIn: '7:48 AM', checkOut: '3:04 PM' },
  { id: 4, date: '2023-09-27', status: 'present', checkIn: '7:56 AM', checkOut: '3:00 PM' },
  { id: 5, date: '2023-09-26', status: 'present', checkIn: '7:50 AM', checkOut: '3:05 PM' },
  { id: 6, date: '2023-09-25', status: 'present', checkIn: '7:53 AM', checkOut: '3:01 PM' },
  { id: 7, date: '2023-09-22', status: 'present', checkIn: '7:49 AM', checkOut: '3:02 PM' },
  { id: 8, date: '2023-09-21', status: 'excused', checkIn: null, checkOut: null, reason: 'Family emergency', documentation: 'Submitted' },
  { id: 9, date: '2023-09-20', status: 'present', checkIn: '7:55 AM', checkOut: '3:00 PM' },
  { id: 10, date: '2023-09-19', status: 'late', checkIn: '8:50 AM', checkOut: '3:03 PM', reason: 'School bus delay', lateMinutes: 35 },
  { id: 11, date: '2023-09-18', status: 'present', checkIn: '7:45 AM', checkOut: '3:02 PM' },
  { id: 12, date: '2023-09-15', status: 'present', checkIn: '7:52 AM', checkOut: '3:05 PM' },
  { id: 13, date: '2023-09-14', status: 'present', checkIn: '7:50 AM', checkOut: '3:03 PM' },
  { id: 14, date: '2023-09-13', status: 'present', checkIn: '7:48 AM', checkOut: '3:01 PM' },
  { id: 15, date: '2023-09-12', status: 'absent', checkIn: null, checkOut: null, reason: 'Doctor\'s appointment', documentation: 'Submitted' },
  { id: 16, date: '2023-09-11', status: 'present', checkIn: '7:55 AM', checkOut: '3:04 PM' },
  { id: 17, date: '2023-09-08', status: 'present', checkIn: '7:50 AM', checkOut: '3:02 PM' },
  { id: 18, date: '2023-09-07', status: 'present', checkIn: '7:53 AM', checkOut: '3:00 PM' },
  { id: 19, date: '2023-09-06', status: 'present', checkIn: '7:49 AM', checkOut: '3:03 PM' },
  { id: 20, date: '2023-09-05', status: 'late', checkIn: '8:45 AM', checkOut: '3:01 PM', reason: 'Traffic delay', lateMinutes: 30 },
  { id: 21, date: '2023-09-04', status: 'present', checkIn: '7:51 AM', checkOut: '3:05 PM' },
  { id: 22, date: '2023-09-01', status: 'present', checkIn: '7:48 AM', checkOut: '3:02 PM' }
];

const AttendanceHistory: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  const filteredHistory = historyData
    .filter(item => selectedMonth === 'all' || item.date.startsWith(selectedMonth))
    .filter(item => selectedStatus === 'all' || item.status === selectedStatus);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Late</Badge>;
      case 'excused':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Excused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Calculate summary statistics
  const calculateSummary = () => {
    const present = historyData.filter(item => item.status === 'present').length;
    const absent = historyData.filter(item => item.status === 'absent').length;
    const late = historyData.filter(item => item.status === 'late').length;
    const excused = historyData.filter(item => item.status === 'excused').length;
    const total = historyData.length;
    const presentPercentage = Math.round((present / total) * 100);
    
    return { present, absent, late, excused, total, presentPercentage };
  };
  
  const summary = calculateSummary();
  
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance History</h1>
          <p className="text-gray-600">Complete record of attendance over time</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="text-xl font-bold text-green-600">{summary.present}</div>
              <div className="text-sm text-gray-500">Present</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="text-xl font-bold text-red-600">{summary.absent}</div>
              <div className="text-sm text-gray-500">Absent</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="text-xl font-bold text-yellow-600">{summary.late}</div>
              <div className="text-sm text-gray-500">Late</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="text-xl font-bold text-blue-600">{summary.excused}</div>
              <div className="text-sm text-gray-500">Excused</div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>Complete history for the current school year</CardDescription>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    <SelectItem value="2023-09">September 2023</SelectItem>
                    <SelectItem value="2023-08">August 2023</SelectItem>
                    <SelectItem value="2023-07">July 2023</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="excused">Excused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Documentation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                          {format(parseISO(record.date), 'MMM d, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(record.status)}
                      </TableCell>
                      <TableCell>
                        {record.checkIn ? (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            {record.checkIn}
                          </div>
                        ) : "N/A"}
                      </TableCell>
                      <TableCell>
                        {record.checkOut ? (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            {record.checkOut}
                          </div>
                        ) : "N/A"}
                      </TableCell>
                      <TableCell>
                        {record.reason ? (
                          <span className="text-sm">{record.reason}</span>
                        ) : (
                          record.status === 'late' ? (
                            <span className="text-yellow-600 text-sm">
                              {record.lateMinutes} minutes late
                            </span>
                          ) : "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {record.documentation ? (
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-blue-500 mr-1" />
                            <span className="text-blue-500 text-sm hover:underline cursor-pointer">
                              View
                            </span>
                          </div>
                        ) : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {filteredHistory.length} of {historyData.length} records
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Attendance Percentage</CardTitle>
            <CardDescription>Overall attendance rate for the current school year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={summary.presentPercentage >= 90 ? "#10b981" : summary.presentPercentage >= 80 ? "#3b82f6" : "#f59e0b"}
                    strokeWidth="3"
                    strokeDasharray={`${summary.presentPercentage}, 100`}
                  />
                  <text
                    x="18"
                    y="20.5"
                    textAnchor="middle"
                    fontSize="8"
                    fill="currentColor"
                    fontWeight="bold"
                  >
                    {summary.presentPercentage}%
                  </text>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {summary.present} present days out of {summary.total} total school days
                </p>
                {summary.presentPercentage >= 90 ? (
                  <p className="text-sm text-green-600 mt-2">Excellent attendance! Keep it up!</p>
                ) : summary.presentPercentage >= 80 ? (
                  <p className="text-sm text-blue-600 mt-2">Good attendance, but room for improvement.</p>
                ) : (
                  <p className="text-sm text-yellow-600 mt-2">Attendance needs improvement. Please ensure regular attendance.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AttendanceHistory;
