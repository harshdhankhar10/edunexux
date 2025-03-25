"use client";
import React, { useState } from 'react';
// import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar, AlertTriangle } from 'lucide-react';

// Mock data for attendance reports
const monthlyAttendance = [
  { month: 'Sep', present: 17, absent: 1, late: 2, excused: 1 },
  { month: 'Aug', present: 15, absent: 2, late: 1, excused: 0 },
  { month: 'Jul', present: 19, absent: 0, late: 1, excused: 2 },
  { month: 'Jun', present: 16, absent: 2, late: 2, excused: 0 },
  { month: 'May', present: 18, absent: 1, late: 0, excused: 1 }
];

const attendanceByDay = [
  { day: 'Monday', present: 15, absent: 1, late: 2, excused: 0 },
  { day: 'Tuesday', present: 16, absent: 1, late: 1, excused: 0 },
  { day: 'Wednesday', present: 17, absent: 0, late: 1, excused: 2 },
  { day: 'Thursday', present: 15, absent: 2, late: 0, excused: 1 },
  { day: 'Friday', present: 16, absent: 1, late: 1, excused: 0 }
];

const overallData = [
  { name: 'Present', value: 79, color: '#10b981' }, // Green
  { name: 'Absent', value: 6, color: '#ef4444' },  // Red
  { name: 'Late', value: 7, color: '#f59e0b' },   // Yellow
  { name: 'Excused', value: 4, color: '#3b82f6' }  // Blue
];

const attendanceRateTrend = [
  { month: 'May', rate: 90 },
  { month: 'Jun', rate: 80 },
  { month: 'Jul', rate: 95 },
  { month: 'Aug', rate: 83 },
  { month: 'Sep', rate: 85 }
];

const tardinessTrend = [
  { month: 'May', lateIncidents: 0, avgMinutes: 0 },
  { month: 'Jun', lateIncidents: 2, avgMinutes: 22 },
  { month: 'Jul', lateIncidents: 1, avgMinutes: 15 },
  { month: 'Aug', lateIncidents: 1, avgMinutes: 20 },
  { month: 'Sep', lateIncidents: 2, avgMinutes: 32 }
];

// Patterns or issues to highlight
const attendancePatterns = [
  { 
    id: 1, 
    type: 'warning', 
    title: 'Monday Tardiness Pattern', 
    description: 'Your child has been late 2 out of the last 4 Mondays. This may affect first period learning.',
    recommended: 'Consider adjusting Monday morning routines to allow for more time.'
  },
  { 
    id: 2, 
    type: 'info', 
    title: 'Perfect Thursday Attendance', 
    description: 'Your child has not missed any Thursdays this year, which is excellent!',
    recommended: 'Continue with current Thursday routines.'
  },
  { 
    id: 3, 
    type: 'warning', 
    title: 'Increasing Tardiness Duration', 
    description: 'The average late arrival time has increased from 15 to 32 minutes over the last 3 months.',
    recommended: 'Try to leave home 15-20 minutes earlier on school days.'
  }
];

const AttendanceReport: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('semester');
  
  const getBarChartData = () => {
    return selectedTimeframe === 'semester' ? monthlyAttendance : attendanceByDay;
  };
  
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Reports</h1>
            <p className="text-gray-600">Detailed reports and statistics</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semester">Current Semester</SelectItem>
                <SelectItem value="days">By Day of Week</SelectItem>
                <SelectItem value="year">School Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Attendance Distribution</CardTitle>
                  <CardDescription>
                    {selectedTimeframe === 'semester' ? 'Monthly attendance breakdown' : 'Attendance by day of week'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getBarChartData()}
                        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                        stackOffset="expand"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey={selectedTimeframe === 'semester' ? 'month' : 'day'} 
                          tick={{ fontSize: 12 }} 
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          formatter={(value) => [`${value} days`, '']}
                          contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        />
                        <Legend />
                        <Bar dataKey="present" stackId="a" name="Present" fill="#10b981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="absent" stackId="a" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="late" stackId="a" name="Late" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="excused" stackId="a" name="Excused" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Overall Distribution</CardTitle>
                  <CardDescription>Year-to-date breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={overallData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={(entry) => `${entry.name}: ${entry.value}%`}
                          labelLine={false}
                        >
                          {overallData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, '']}
                          contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {overallData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full bg-gray-100 p-3 rounded-md text-sm">
                    <div className="font-medium">Summary</div>
                    <p className="text-gray-600 mt-1">
                      {overallData[0].value >= 90 
                        ? "Excellent attendance record" 
                        : overallData[0].value >= 80 
                        ? "Good attendance with room for improvement" 
                        : "Attendance needs significant improvement"}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Rate Trend</CardTitle>
                  <CardDescription>Monthly attendance percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={attendanceRateTrend}
                        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Attendance Rate']}
                          contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        />
                        <Bar 
                          dataKey="rate" 
                          name="Attendance Rate" 
                          radius={[4, 4, 0, 0]}
                          fill="url(#colorGradient)"
                        />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="text-sm text-gray-600">Average:</span>
                      <span className="ml-2 font-medium">
                        {Math.round(attendanceRateTrend.reduce((acc, curr) => acc + curr.rate, 0) / attendanceRateTrend.length)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Goal:</span>
                      <span className="ml-2 font-medium text-green-600">95%</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tardiness Analysis</CardTitle>
                  <CardDescription>Frequency and average minutes late</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={tardinessTrend}
                        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        />
                        <Legend />
                        <Bar 
                          yAxisId="left" 
                          dataKey="lateIncidents" 
                          name="Number of Late Arrivals" 
                          fill="#f59e0b" 
                          radius={[4, 4, 0, 0]} 
                        />
                        <Bar 
                          yAxisId="right" 
                          dataKey="avgMinutes" 
                          name="Avg. Minutes Late" 
                          fill="#3b82f6" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Key Observations</CardTitle>
                <CardDescription>Insights from attendance trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800">Attendance Patterns</h3>
                    <ul className="mt-2 space-y-2 text-blue-700">
                      <li className="flex items-start">
                        <Calendar className="h-5 w-5 mr-2 mt-0.5 text-blue-600" />
                        <span>Your child's attendance shows fluctuation between 80% and 95% with an average of 87%.</span>
                      </li>
                      <li className="flex items-start">
                        <Calendar className="h-5 w-5 mr-2 mt-0.5 text-blue-600" />
                        <span>Highest attendance was in July (95%) and lowest in June (80%).</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h3 className="text-lg font-medium text-amber-800">Tardiness Insights</h3>
                    <ul className="mt-2 space-y-2 text-amber-700">
                      <li className="flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 text-amber-600" />
                        <span>Late arrivals have maintained a consistent frequency (1-2 per month) but the average duration has increased from 15 to 32 minutes.</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 text-amber-600" />
                        <span>Monday shows the highest frequency of tardiness (2 out of 4 Mondays).</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="patterns" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Patterns and Recommendations</CardTitle>
                <CardDescription>Identified patterns that may affect academic performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {attendancePatterns.map((pattern) => (
                    <div 
                      key={pattern.id} 
                      className={`p-4 rounded-lg border ${
                        pattern.type === 'warning' 
                          ? 'border-amber-200 bg-amber-50' 
                          : pattern.type === 'info' 
                          ? 'border-blue-200 bg-blue-50' 
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <h3 className={`text-lg font-medium ${
                        pattern.type === 'warning' 
                          ? 'text-amber-800' 
                          : pattern.type === 'info' 
                          ? 'text-blue-800' 
                          : 'text-red-800'
                      }`}>
                        {pattern.title}
                      </h3>
                      <p className={`mt-1 ${
                        pattern.type === 'warning' 
                          ? 'text-amber-700' 
                          : pattern.type === 'info' 
                          ? 'text-blue-700' 
                          : 'text-red-700'
                      }`}>
                        {pattern.description}
                      </p>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700">Recommendation:</h4>
                        <p className="text-sm text-gray-600">
                          {pattern.recommended}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium">Teacher Notes</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Alex's attendance has generally been good, but tardiness is becoming a concern, especially in morning classes. 
                    This can disrupt learning and cause Alex to miss important instructions. We recommend addressing the 
                    morning routine to ensure timely arrival, particularly on Mondays.
                  </p>
                </div>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Supporting Academic Success</CardTitle>
                <CardDescription>Ways to improve attendance and punctuality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="font-medium text-green-800">Morning Routines</h3>
                    <ul className="mt-2 space-y-1 text-sm text-green-700 list-disc list-inside">
                      <li>Prepare backpack and clothes the night before</li>
                      <li>Set multiple alarms 15 minutes apart</li>
                      <li>Establish a consistent wake-up time</li>
                      <li>Allow extra time for Monday mornings</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <h3 className="font-medium text-purple-800">Transportation</h3>
                    <ul className="mt-2 space-y-1 text-sm text-purple-700 list-disc list-inside">
                      <li>Have a backup transportation plan</li>
                      <li>Leave 10-15 minutes earlier than needed</li>
                      <li>Check traffic reports before leaving</li>
                      <li>Consider alternate routes for busy days</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-800">Health & Wellness</h3>
                    <ul className="mt-2 space-y-1 text-sm text-blue-700 list-disc list-inside">
                      <li>Ensure adequate sleep (8-10 hours)</li>
                      <li>Schedule doctor appointments after school</li>
                      <li>Maintain proper nutrition</li>
                      <li>Practice good hygiene to prevent illness</li>
                    </ul>
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

export default AttendanceReport;
