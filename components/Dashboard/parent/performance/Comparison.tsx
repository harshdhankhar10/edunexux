"use client"
import React, { useState } from 'react';
// import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// Mock class comparison data
const comparisonData = {
  subjects: [
    {
      subject: 'Math',
      studentScore: 85,
      classAverage: 78,
      topQuartile: 92,
      median: 80,
      bottomQuartile: 65
    },
    {
      subject: 'Science',
      studentScore: 92,
      classAverage: 81,
      topQuartile: 94,
      median: 83,
      bottomQuartile: 70
    },
    {
      subject: 'English',
      studentScore: 78,
      classAverage: 80,
      topQuartile: 92,
      median: 82,
      bottomQuartile: 68
    },
    {
      subject: 'History',
      studentScore: 88,
      classAverage: 76,
      topQuartile: 90,
      median: 79,
      bottomQuartile: 64
    },
    {
      subject: 'Art',
      studentScore: 95,
      classAverage: 86,
      topQuartile: 96,
      median: 88,
      bottomQuartile: 76
    }
  ],
  skills: [
    { skill: 'Critical Thinking', student: 85, classAverage: 75 },
    { skill: 'Problem Solving', student: 80, classAverage: 72 },
    { skill: 'Communication', student: 78, classAverage: 80 },
    { skill: 'Collaboration', student: 90, classAverage: 82 },
    { skill: 'Creativity', student: 92, classAverage: 78 },
    { skill: 'Organization', student: 75, classAverage: 70 }
  ],
  trends: {
    months: ['May', 'June', 'July', 'August', 'September'],
    student: [82, 84, 86, 87, 88],
    classAverage: [77, 78, 79, 78, 80]
  }
};

const Comparison: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  const filteredSubjects = selectedSubject === 'all' 
    ? comparisonData.subjects 
    : comparisonData.subjects.filter(subject => subject.subject === selectedSubject);
  
  // Generate data for the trend chart
  const trendChartData = comparisonData.trends.months.map((month, index) => ({
    month,
    student: comparisonData.trends.student[index],
    classAverage: comparisonData.trends.classAverage[index]
  }));
  
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Comparison</h1>
          <p className="text-gray-600">See how your child compares to class averages</p>
        </div>
        
        <Tabs defaultValue="subjects" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="subjects">Subject Comparison</TabsTrigger>
            <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subjects" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Subject Performance vs. Class</CardTitle>
                    <CardDescription>How your child compares to the class average</CardDescription>
                  </div>
                  <div className="mt-4 md:mt-0 w-full max-w-xs">
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {comparisonData.subjects.map(subject => (
                          <SelectItem key={subject.subject} value={subject.subject}>
                            {subject.subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredSubjects}
                      margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Score']}
                        contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                      />
                      <Legend />
                      <Bar dataKey="studentScore" name="Your Child" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="classAverage" name="Class Average" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="topQuartile" name="Top 25%" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSubjects.map((subject, index) => (
                    <Card key={index} className="border-l-4 border-blue-500">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-2">{subject.subject}</h3>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Your Child</span>
                            <span className="font-medium text-blue-600">{subject.studentScore}%</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Class Average</span>
                            <span className="font-medium text-green-600">{subject.classAverage}%</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Difference</span>
                            <span className={`font-medium ${subject.studentScore >= subject.classAverage ? 'text-green-600' : 'text-red-600'}`}>
                              {subject.studentScore >= subject.classAverage ? '+' : ''}
                              {(subject.studentScore - subject.classAverage).toFixed(1)}%
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Class Ranking</span>
                            <span className="font-medium">
                              {subject.studentScore >= subject.topQuartile ? 'Top 25%' : 
                                subject.studentScore >= subject.median ? 'Top 50%' : 
                                subject.studentScore >= subject.bottomQuartile ? 'Bottom 50%' : 'Bottom 25%'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>Comparison of key academic and social skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={comparisonData.skills}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar
                        name="Your Child"
                        dataKey="student"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.5}
                      />
                      <Radar
                        name="Class Average"
                        dataKey="classAverage"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.5}
                      />
                      <Legend />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Score']}
                        contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {comparisonData.skills.map((skill, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-base mb-2">{skill.skill}</h3>
                        
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Your Child</span>
                          <span className="font-medium text-blue-600">{skill.student}%</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${skill.student}%` }}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Class Average</span>
                          <span className="font-medium text-green-600">{skill.classAverage}%</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${skill.classAverage}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Average scores over the past five months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendChartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Grade']}
                        contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="student" 
                        name="Your Child" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2 }} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="classAverage" 
                        name="Class Average" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2 }} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-lg text-blue-800 mb-2">Analysis</h3>
                  <p className="text-blue-700">
                    Your child's performance shows a positive upward trend over the past 5 months, improving from 82% to 88%.
                    This represents a 6% increase compared to the class average improvement of 3%.
                    The consistent upward trajectory suggests effective learning habits and growing subject mastery.
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-1">Strengths</h4>
                      <ul className="list-disc pl-5 text-sm text-blue-700">
                        <li>Consistent improvement month-over-month</li>
                        <li>Outpacing class average growth</li>
                        <li>Maintaining performance above class average</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-1">Recommendations</h4>
                      <ul className="list-disc pl-5 text-sm text-blue-700">
                        <li>Continue current study habits and approach</li>
                        <li>Consider advanced material to maintain engagement</li>
                        <li>Periodic reviews to reinforce learned concepts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Comparison;
