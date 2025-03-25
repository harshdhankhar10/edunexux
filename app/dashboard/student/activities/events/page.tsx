"use client";

import React, { useState } from 'react';
import { 
  CalendarDays, Clock, MapPin, Users, Plus, CheckCircle, 
  XCircle, Search, Filter, ChevronRight, Edit, Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Conference 2023',
      date: '2023-11-15',
      time: '09:00 AM - 05:00 PM',
      location: 'Convention Center, New York',
      attendees: 120,
      status: 'Confirmed',
      organizer: 'Tech Innovators Inc.'
    },
    {
      id: 2,
      title: 'Art Exhibition Opening',
      date: '2023-11-20',
      time: '06:00 PM - 09:00 PM',
      location: 'City Art Gallery, San Francisco',
      attendees: 80,
      status: 'Confirmed',
      organizer: 'Art Society'
    },
    {
      id: 3,
      title: 'Charity Gala Dinner',
      date: '2023-12-05',
      time: '07:00 PM - 11:00 PM',
      location: 'Grand Hotel, Chicago',
      attendees: 200,
      status: 'Pending',
      organizer: 'Hope Foundation'
    }
  ];

  // Sample data for past events
  const pastEvents = [
    {
      id: 4,
      title: 'Annual Music Festival',
      date: '2023-09-30',
      time: '12:00 PM - 10:00 PM',
      location: 'Central Park, New York',
      attendees: 500,
      status: 'Completed',
      organizer: 'Music Lovers Association'
    },
    {
      id: 5,
      title: 'Startup Pitch Night',
      date: '2023-08-25',
      time: '06:00 PM - 09:00 PM',
      location: 'Innovation Hub, San Francisco',
      attendees: 150,
      status: 'Completed',
      organizer: 'Startup Network'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="pt-24 container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Events Management</h1>
            <p className="text-gray-600 mt-1">Manage and organize your events efficiently</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search events..."
                className="pl-9 pr-4 py-2 rounded-md border border-gray-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-gray-200 p-1 h-10">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="animate-fade-in hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.organizer}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{event.attendees} Attendees</span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {event.status === 'Confirmed' ? 
                            <CheckCircle className="h-3 w-3 mr-1" /> : 
                            <XCircle className="h-3 w-3 mr-1" />
                          }
                          {event.status}
                        </span>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <Card key={event.id} className="animate-fade-in hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Organizer: {event.organizer}</p>
                      </div>
                      
                      <div className="flex-1 mt-4 md:mt-0">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{event.attendees} Attendees</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 mt-4 md:mt-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600`}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {event.status}
                        </span>
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm" className="mr-2">
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                            <ChevronRight className="h-3.5 w-3.5 mr-1" />
                            View Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventsPage;