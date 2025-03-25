"use client";
import React, { useState } from 'react';
// import Layout from '@/components/Dashboard/parent/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, Check, Clock, File, Info } from 'lucide-react';
import { format } from 'date-fns';

// Mock assessment data
const assessments = {
  completed: [
    {
      id: 'a1',
      title: 'Math Chapter 1 Test',
      subject: 'Math',
      date: '2023-09-10',
      score: 78,
      maxScore: 100,
      duration: 60,
      topics: ['Algebra', 'Equations', 'Functions'],
      feedback: 'Good work on algebra equations. Further practice needed on graphing functions.'
    },
    {
      id: 'a2',
      title: 'Science Lab Assessment',
      subject: 'Science',
      date: '2023-09-08',
      score: 92,
      maxScore: 100,
      duration: 45,
      topics: ['Scientific Method', 'Lab Safety', 'Data Analysis'],
      feedback: 'Excellent lab work and data analysis. Very thorough scientific method application.'
    },
    {
      id: 'a3',
      title: 'English Vocabulary Quiz',
      subject: 'English',
      date: '2023-09-06',
      score: 75,
      maxScore: 100,
      duration: 30,
      topics: ['Vocabulary', 'Word Meanings', 'Context Clues'],
      feedback: 'Satisfactory understanding of vocabulary. Work needed on using context clues.'
    },
    {
      id: 'a4',
      title: 'History Civil War Test',
      subject: 'History',
      date: '2023-09-04',
      score: 88,
      maxScore: 100,
      duration: 60,
      topics: ['Civil War', 'Historical Figures', 'Timeline'],
      feedback: 'Strong understanding of historical events and figures. Could improve on specific dates.'
    }
  ],
  upcoming: [
    {
      id: 'u1',
      title: 'Math Chapter 2 Test',
      subject: 'Math',
      date: '2023-09-25',
      duration: 60,
      topics: ['Geometry', 'Triangles', 'Pythagorean Theorem'],
      resources: ['Textbook Chap. 2', 'Class notes', 'Online practice quiz']
    },
    {
      id: 'u2',
      title: 'Science Quiz on Elements',
      subject: 'Science',
      date: '2023-09-23',
      duration: 30,
      topics: ['Periodic Table', 'Elements', 'Compounds'],
      resources: ['Periodic Table handout', 'Lab notes', 'Online flashcards']
    },
    {
      id: 'u3',
      title: 'English Reading Comprehension',
      subject: 'English',
      date: '2023-09-30',
      duration: 45,
      topics: ['Reading Comprehension', 'Main Idea', 'Supporting Details'],
      resources: ['Novel chapters 5-8', 'Study guide']
    }
  ]
};

const Assessments: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  const filteredCompleted = selectedSubject === 'all' 
    ? assessments.completed 
    : assessments.completed.filter(assessment => assessment.subject === selectedSubject);
  
  const filteredUpcoming = selectedSubject === 'all' 
    ? assessments.upcoming 
    : assessments.upcoming.filter(assessment => assessment.subject === selectedSubject);
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-amber-600 bg-amber-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-amber-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  const subjects = ['Math', 'Science', 'English', 'History'];
  
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-600">Review test scores and assessment results</p>
        </div>
        
        <div className="w-full max-w-xs">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="completed" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-2">
            <TabsTrigger value="completed">Completed Assessments</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Assessments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {filteredCompleted.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-500 text-center">No completed assessments found</p>
                  </CardContent>
                </Card>
              ) : (
                filteredCompleted.map((assessment) => (
                  <Card key={assessment.id} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <CardTitle className="text-lg">{assessment.title}</CardTitle>
                          <CardDescription>{assessment.subject} • {format(new Date(assessment.date), 'MMMM d, yyyy')}</CardDescription>
                        </div>
                        <div className={`mt-2 sm:mt-0 text-center px-4 py-2 rounded-full font-semibold ${getScoreColor(assessment.score)}`}>
                          {assessment.score}%
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-4">
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Score</span>
                          <span>{assessment.score}/{assessment.maxScore}</span>
                        </div>
                        <Progress
                          value={(assessment.score / assessment.maxScore) * 100}
                          className={`h-2 ${getProgressColor(assessment.score)}`}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Topics Covered</h4>
                          <div className="flex flex-wrap gap-1">
                            {assessment.topics.map((topic, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">{assessment.duration} minutes</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardContent className="pt-0">
                      <div className="mt-3 p-3 bg-blue-50 rounded-md">
                        <h4 className="text-sm font-medium text-blue-800 mb-1 flex items-center">
                          <Info className="h-4 w-4 mr-1" /> Teacher Feedback
                        </h4>
                        <p className="text-sm text-blue-700">{assessment.feedback}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <File className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="space-y-4">
              {filteredUpcoming.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-500 text-center">No upcoming assessments found</p>
                  </CardContent>
                </Card>
              ) : (
                filteredUpcoming.map((assessment) => (
                  <Card key={assessment.id} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <CardTitle className="text-lg">{assessment.title}</CardTitle>
                          <CardDescription>{assessment.subject}</CardDescription>
                        </div>
                        <div className="mt-2 sm:mt-0 bg-purple-100 text-purple-800 text-center px-4 py-2 rounded-full font-medium">
                          {format(new Date(assessment.date), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{assessment.duration} minutes</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">
                          {Math.ceil((new Date(assessment.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days away
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Topics to Study</h4>
                        <div className="flex flex-wrap gap-1">
                          {assessment.topics.map((topic, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Study Resources</h4>
                        <ul className="list-inside space-y-1">
                          {assessment.resources.map((resource, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button size="sm">
                        Start Studying
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Assessments;
