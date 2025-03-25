"use client";
 
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, BookOpen, Calendar, CheckCircle, Clock, Users } from 'lucide-react';
import { recentGrades, performanceData, attendanceStats, messages, meetings, announcements } from '@/components/Dashboard/parent/data/mockData';

const DashboardOverview: React.FC = () => {
  const gradeData = recentGrades.map((grade) => ({
    subject: grade.subject,
    score: grade.score,
    maxScore: grade.maxScore,
  }));

  const attendancePieData = [
    { name: 'Present', value: attendanceStats.present, color: '#34D399' },
    { name: 'Absent', value: attendanceStats.absent, color: '#F87171' },
    { name: 'Late', value: attendanceStats.late, color: '#FBBF24' },
    { name: 'Excused', value: attendanceStats.excused, color: '#60A5FA' },
  ];

  const COLORS = ['#34D399', '#F87171', '#FBBF24', '#60A5FA'];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
      <p className="text-gray-600">Welcome back! Here's an overview of your child's progress.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Current GPA</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">3.7</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-md">
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">4%</span>
              <span className="text-gray-500 ml-1">from last term</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">94%</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-md">
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">1%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Tests</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">3</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-md">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <Clock className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-gray-500">Next: Math on Friday</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Teacher Messages</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{messages.length}</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-md">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
              <span className="text-gray-500">{messages.filter(m => !m.read).length} unread messages</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
            <CardDescription>Recent grades across subjects</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
          <CardHeader>
            <CardTitle>Subject Performance Trends</CardTitle>
            <CardDescription>How scores have changed over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    type="category" 
                    allowDuplicatedCategory={false} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                  />
                  <Legend />
                  {performanceData.map((subject) => (
                    <Line 
                      key={subject.subject}
                      data={subject.scores}
                      type="monotone" 
                      dataKey="score" 
                      name={subject.subject} 
                      stroke={
                        subject.subject === 'Math' ? '#3B82F6' : 
                        subject.subject === 'Science' ? '#10B981' : 
                        subject.subject === 'English' ? '#F59E0B' : 
                        '#EC4899'
                      }
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Attendance record this semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendancePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }: { name: string; percent?: number }) =>
                    `${name}: ${percent !== undefined ? percent.toFixed(0) : "0"}%`
                  }
                    labelLine={false}
                  >
                    {attendancePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, 'Days']}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {attendancePieData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-600">{item.name}: {item.value} days</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>Scheduled meetings with teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meetings.length > 0 ? (
                meetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      {meeting.teacher.avatar ? (
                        <img src={meeting.teacher.avatar} alt={meeting.teacher.name} className="h-10 w-10 rounded-full" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-500 font-semibold text-sm">{meeting.teacher.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">{meeting.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          meeting.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                          meeting.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          meeting.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">with {meeting.teacher.name}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{meeting.date} at {meeting.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No upcoming meetings</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow transition-shadow">
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Important updates from school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.length > 0 ? (
                announcements.slice(0, 3).map((announcement) => (
                  <div key={announcement.id} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{announcement.title}</h4>
                      {announcement.important && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">Important</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">{announcement.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <span>By {announcement.author.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{announcement.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No recent announcements</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
