"use client"

import React from 'react';
import { 
  Megaphone, 
  ChevronRight, 
  Calendar, 
  ExternalLink 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AnnouncementsList = () => {
  const announcements = [
    {
      id: 1,
      title: 'Campus Closed for Maintenance',
      content: 'The campus will be closed on September 20 for essential maintenance. All classes will be conducted online.',
      date: 'Sep 12, 2023',
      author: 'Administrative Office',
      important: true
    },
    {
      id: 2,
      title: 'Library Extended Hours',
      content: 'The university library will extend operating hours during exam season, open until 12 AM from Oct 1-15.',
      date: 'Sep 10, 2023',
      author: 'Library Services',
      important: false
    },
    {
      id: 3,
      title: 'Guest Lecture: AI in Education',
      content: 'Join us for a special guest lecture on AI applications in modern education systems.',
      date: 'Sep 8, 2023',
      author: 'Computer Science Department',
      important: false
    }
  ];

  return (
    <Card className="rounded-xl border border-gray-100 shadow-soft p-6 animate-fade-in delay-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Megaphone className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Announcements</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div 
            key={announcement.id} 
            className={`p-4 rounded-lg border ${announcement.important ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-white/50'} hover:shadow-soft transition-all duration-300`}
          >
            <div className="flex justify-between mb-2">
              <h3 className={`font-medium ${announcement.important ? 'text-red-600' : 'text-gray-900'}`}>
                {announcement.important && <span className="inline-block px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full mr-2">Important</span>}
                {announcement.title}
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {announcement.content}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{announcement.date}</span>
              </div>
              <span>{announcement.author}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AnnouncementsList;