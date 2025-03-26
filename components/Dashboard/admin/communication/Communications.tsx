"use client"
import React from 'react';
import { useQuery,QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { PlusCircle, Filter, Bell, MessageSquare, Mail } from 'lucide-react';
// import DashboardLayout from '@/components/layout/DashboardLayout';
import AnalyticsCard from '@/components/Dashboard/admin/dashboard/AnalyticsCard';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const queryClient = new QueryClient()

// Mock data for announcements
const fetchAnnouncements = async () => {
  // In a real application, this would fetch from an API
  return [
    {
      id: 1,
      title: 'School Closure - Weather Advisory',
      category: 'Emergency',
      audience: 'All',
      sender: 'Principal Smith',
      date: '2023-06-10',
      status: 'active'
    },
    {
      id: 2,
      title: 'Parent-Teacher Conference Schedule',
      category: 'Event',
      audience: 'Parents',
      sender: 'Admin Office',
      date: '2023-06-08',
      status: 'active'
    },
    {
      id: 3,
      title: 'Final Exam Schedule Released',
      category: 'Academic',
      audience: 'Students',
      sender: 'Academic Department',
      date: '2023-06-05',
      status: 'active'
    },
    {
      id: 4,
      title: 'Summer Program Registration Open',
      category: 'Program',
      audience: 'Students',
      sender: 'Program Coordinator',
      date: '2023-06-02',
      status: 'active'
    },
    {
      id: 5,
      title: 'School Infrastructure Maintenance',
      category: 'Facility',
      audience: 'Staff',
      sender: 'Facilities Department',
      date: '2023-05-30',
      status: 'inactive'
    },
    {
      id: 6,
      title: 'New Curriculum Implementation',
      category: 'Academic',
      audience: 'Teachers',
      sender: 'Curriculum Director',
      date: '2023-05-28',
      status: 'active'
    },
    {
      id: 7,
      title: 'Sports Day Event Details',
      category: 'Event',
      audience: 'All',
      sender: 'Physical Education Dept',
      date: '2023-05-25',
      status: 'active'
    },
    {
      id: 8,
      title: 'Teacher Professional Development Day',
      category: 'Training',
      audience: 'Teachers',
      sender: 'HR Department',
      date: '2023-05-20',
      status: 'active'
    }
  ];
};

const CommunicationsPageContent = () => {
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements
  });

  return (
    <>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Communications</h1>
            <p className="text-slate-500 mt-1">Manage announcements, messages and notifications</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <Button className="bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2">
              <PlusCircle size={16} />
              New Announcement
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <AnalyticsCard title="Announcements" className="bg-white shadow-sm">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold">{announcements.length}</span>
              <span className="text-slate-500 text-sm">Total announcements</span>
            </div>
          </AnalyticsCard>
          <AnalyticsCard title="Messages" className="bg-white shadow-sm">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold">124</span>
              <span className="text-slate-500 text-sm">Unread messages</span>
            </div>
          </AnalyticsCard>
          <AnalyticsCard title="Email Campaigns" className="bg-white shadow-sm">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold">8</span>
              <span className="text-slate-500 text-sm">Running campaigns</span>
            </div>
          </AnalyticsCard>
        </div>

        <AnalyticsCard title="Recent Announcements" className="bg-white shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative max-w-md">
              <Input
                placeholder="Search announcements..."
                className="pl-10 w-full"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading announcements...
                    </TableCell>
                  </TableRow>
                ) : announcements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No announcements found
                    </TableCell>
                  </TableRow>
                ) : (
                  announcements.map(announcement => (
                    <TableRow key={announcement.id}>
                      <TableCell className="font-medium">{announcement.title}</TableCell>
                      <TableCell>{announcement.category}</TableCell>
                      <TableCell>{announcement.audience}</TableCell>
                      <TableCell>{announcement.sender}</TableCell>
                      <TableCell>{announcement.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            announcement.status === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : 'bg-slate-100 text-slate-800 hover:bg-slate-100'
                          }
                        >
                          {announcement.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </AnalyticsCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsCard title="Recent Messages" className="bg-white shadow-sm">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-slate-800">John Doe</p>
                      <span className="text-xs text-slate-500">10:45 AM</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">Question about the upcoming exam schedule...</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="text-primary-600 hover:text-primary-700">
                View All Messages
              </Button>
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Email Campaign Status" className="bg-white shadow-sm">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-slate-800">End of Semester Newsletter</p>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Sending</Badge>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-slate-500">Recipients: 2,453</p>
                      <p className="text-xs text-slate-500">Opened: 68%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="text-primary-600 hover:text-primary-700">
                View All Campaigns
              </Button>
            </div>
          </AnalyticsCard>
        </div>
      </div>
    </>
  );
};

const CommunicationsPage = ()=>{
  return (
    <QueryClientProvider client={queryClient}>
      <CommunicationsPageContent />
    </QueryClientProvider>
  )
}

export default CommunicationsPage;
