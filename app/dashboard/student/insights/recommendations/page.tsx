"use client";

import React, { useState } from 'react';
import { Lightbulb, Book, Star, Clock, ArrowRight, Filter, ThumbsUp, Bookmark, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';

const RecommendationsPage = () => {
  const [activeTab, setActiveTab] = useState('courses');
  
  const recommendedCourses = [
    {
      id: 1,
      title: "Advanced Calculus",
      description: "Based on your performance in Basic Calculus, this course will help you advance your mathematical skills.",
      relevance: 95,
      category: "Mathematics",
      duration: "12 weeks",
      difficulty: "Advanced",
      endorsed: true
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      description: "Recommended to improve your problem-solving skills and prepare for technical interviews.",
      relevance: 87,
      category: "Computer Science",
      duration: "10 weeks",
      difficulty: "Intermediate",
      endorsed: true
    },
    {
      id: 3,
      title: "Introduction to AI",
      description: "Learn the fundamentals of artificial intelligence and machine learning.",
      relevance: 82,
      category: "Computer Science",
      duration: "8 weeks",
      difficulty: "Beginner",
      endorsed: false
    },
    {
      id: 4,
      title: "Quantum Physics",
      description: "Explore the fascinating world of quantum mechanics and its applications.",
      relevance: 75,
      category: "Physics",
      duration: "16 weeks",
      difficulty: "Advanced",
      endorsed: false
    }
  ];
  
  const recommendedResources = [
    {
      id: 1,
      title: "Mathematics Handbook",
      description: "A comprehensive guide to mathematical concepts and formulas.",
      type: "E-Book",
      author: "Dr. Robert Smith",
      rating: 4.8,
      downloads: 1245
    },
    {
      id: 2,
      title: "Programming Crash Course",
      description: "Video tutorials covering essential programming concepts.",
      type: "Video Series",
      author: "CodeMaster Academy",
      rating: 4.5,
      downloads: 3642
    },
    {
      id: 3,
      title: "Quantum Physics: A Simple Introduction",
      description: "An accessible introduction to quantum physics for beginners.",
      type: "E-Book",
      author: "Dr. Lisa Johnson",
      rating: 4.7,
      downloads: 987
    }
  ];
  
  const recommendedEvents = [
    {
      id: 1,
      title: "AI Summit 2024",
      description: "Global conference on the latest advancements in artificial intelligence.",
      date: "May 15-17, 2024",
      location: "Online",
      category: "Conference"
    },
    {
      id: 2,
      title: "Data Science Workshop",
      description: "Hands-on workshop to improve your data analysis skills.",
      date: "June 5, 2024",
      location: "Main Campus",
      category: "Workshop"
    },
    {
      id: 3,
      title: "Career Fair: Tech Edition",
      description: "Connect with top tech companies and explore career opportunities.",
      date: "July 10, 2024",
      location: "University Hall",
      category: "Networking"
    }
  ];

  // Render course card
  const CourseCard = ({ course }:any) => (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium">{course.title}</h3>
            {course.endorsed && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                <Sparkles className="h-3 w-3 mr-1" />
                Recommended
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline">{course.category}</Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {course.duration}
            </Badge>
            <Badge variant="outline">{course.difficulty}</Badge>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <span className="font-bold text-blue-500">{course.relevance}%</span>
          </div>
          <span className="text-xs mt-1">Match</span>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Button variant="ghost" size="sm">
          <Bookmark className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" size="sm">
          View Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );

  // Render resource card
  const ResourceCard = ({ resource }:any) => (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-md bg-blue-500/10 flex items-center justify-center">
          {resource.type === "E-Book" ? 
            <Book className="h-5 w-5 text-blue-500" /> : 
            <Star className="h-5 w-5 text-blue-500" />}
        </div>
        <div>
          <h3 className="font-medium">{resource.title}</h3>
          <p className="text-xs text-muted-foreground">{resource.type} by {resource.author}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-sm ml-1">{resource.rating}</span>
          <span className="text-xs text-muted-foreground ml-3">{resource.downloads}+ downloads</span>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" size="sm">
          Access
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );

  // Render event card
  const EventCard = ({ event }:any) => (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{event.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {event.date}
            </Badge>
            <Badge variant="outline">{event.location}</Badge>
            <Badge variant="outline">{event.category}</Badge>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" size="sm">
          Event Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold">Smart Recommendations</h1>
            <p className="text-muted-foreground">Personalized suggestions based on your profile and performance</p>
          </div>
          
          <Button variant="outline" className="mt-3 sm:mt-0">
            <Filter className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </div>
        
        <Tabs defaultValue="courses" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="resources">Learning Resources</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RecommendationsPage;