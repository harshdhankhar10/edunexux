
import React from 'react';
// import Layout from '@/components/layout/Layout';
import { announcements } from '@/components/Dashboard/parent/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const MessageAnnouncements: React.FC = () => {
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Announcements</h1>
          <p className="text-gray-600">Important updates from the school</p>
        </div>
        
        <div className="space-y-4">
          {announcements.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center">No announcements available</p>
              </CardContent>
            </Card>
          ) : (
            announcements.map((announcement) => (
              <Card key={announcement.id} className="transition-all hover:shadow-md">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg font-semibold">
                          {announcement.title}
                        </CardTitle>
                        {announcement.important && (
                          <Badge variant="destructive">Important</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            {announcement.author.avatar ? (
                              <img 
                                src={announcement.author.avatar} 
                                alt={announcement.author.name} 
                                className="aspect-square h-full w-full"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                {announcement.author.name.charAt(0)}
                              </div>
                            )}
                          </Avatar>
                          <span>{announcement.author.name}</span>
                        </div>
                        <span>•</span>
                        <span>{format(new Date(announcement.date), 'MMMM d, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-gray-700">{announcement.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MessageAnnouncements;
