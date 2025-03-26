"use client";
import React, { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Bell, MessageSquare, Mail } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: string;
  sender: string;
  date: string;
  status: 'active' | 'inactive';
}

interface CommunicationStats {
  totalAnnouncements: number;
  activeAnnouncements: number;
  unreadMessages: number;
  emailCampaigns: number;
}

const CommunicationsPage = ({
  initialAnnouncements,
  initialStats
}: {
  initialAnnouncements: Announcement[];
  initialStats: CommunicationStats;
}) => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [stats] = useState(initialStats);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
          <p className="text-sm text-gray-500">
            Manage announcements and communications
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Announcement
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Announcements" 
          value={stats.totalAnnouncements} 
          icon={<Bell className="h-5 w-5" />} 
        />
        <StatsCard 
          title="Active" 
          value={stats.activeAnnouncements} 
          icon={<Bell className="h-5 w-5" />} 
          variant="success"
        />
        <StatsCard 
          title="Messages" 
          value={stats.unreadMessages} 
          icon={<MessageSquare className="h-5 w-5" />} 
          variant="info"
        />
        <StatsCard 
          title="Campaigns" 
          value={stats.emailCampaigns} 
          icon={<Mail className="h-5 w-5" />} 
          variant="purple"
        />
      </div>

      {/* Announcements Table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-gray-500" />
            <span>Announcements</span>
            <Badge variant="secondary" className="ml-auto">
              {filteredAnnouncements.length} records
            </Badge>
          </CardTitle>
        </CardHeader>
        <div className="p-4 border-b">
          <Input
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No announcements found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium">{announcement.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {announcement.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{announcement.sender}</TableCell>
                    <TableCell>{announcement.date}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={announcement.status === 'active' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {announcement.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

const StatsCard = ({ 
  title, 
  value, 
  icon,
  variant = 'default'
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant?: 'default' | 'success' | 'info' | 'purple';
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-900',
    success: 'bg-green-100 text-green-900',
    info: 'bg-blue-100 text-blue-900',
    purple: 'bg-purple-100 text-purple-900'
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-semibold">{value}</h3>
          </div>
          <div className={`rounded-lg p-3 ${variantClasses[variant]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationsPage;