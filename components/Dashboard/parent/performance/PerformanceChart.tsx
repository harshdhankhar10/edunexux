
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { performanceData, recentGrades } from '@/components/Dashboard/parent/data/mockData';

const PerformanceChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState('grades');

  const gradeData = recentGrades.map((grade) => ({
    subject: grade.subject,
    score: grade.score,
    maxScore: grade.maxScore,
  }));

  // Transform performance data for LineChart
  const lineChartData = performanceData[0].scores.map((scoreObj) => {
    const dataPoint: any = { date: scoreObj.date };
    
    performanceData.forEach((subject) => {
      const matchingScore = subject.scores.find((score) => score.date === scoreObj.date);
      if (matchingScore) {
        dataPoint[subject.subject] = matchingScore.score;
      }
    });
    
    return dataPoint;
  });

  return (
    <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
      <CardHeader>
        <CardTitle>Academic Performance</CardTitle>
        <CardDescription>Visualize performance trends and recent grades</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grades">Recent Grades</TabsTrigger>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="grades" className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={gradeData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                  />
                  <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Grade Details</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="divide-y divide-gray-200">
                  {recentGrades.map((grade, index) => (
                    <div key={index} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{grade.subject}</p>
                        <p className="text-xs text-gray-500">{grade.date}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{grade.score}/{grade.maxScore}</span>
                        <div className="ml-2 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {Math.round((grade.score / grade.maxScore) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="trends" className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Math" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Science" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="English" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="History" stroke="#EC4899" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Subject Performance Analysis</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {performanceData.map((subject, index) => {
                  const scores = subject.scores.map(s => s.score);
                  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
                  const trend = scores[scores.length - 1] > scores[scores.length - 2] ? 'up' : 'down';
                  
                  return (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                      <h5 className="text-sm font-medium text-gray-900">{subject.subject}</h5>
                      <div className="mt-2 mb-1">
                        <span className="text-2xl font-bold">{averageScore}%</span>
                      </div>
                      <p className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {trend === 'up' ? '↑ Improving' : '↓ Needs focus'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
