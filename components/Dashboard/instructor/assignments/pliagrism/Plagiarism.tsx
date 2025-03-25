"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { AlertTriangle, FileText, Search, Shield, Users, ChevronRight } from "lucide-react";

// Type definitions
type Submission = {
  id: number;
  student: string;
  title: string;
  similarity: number;
  status: "High Risk" | "Medium Risk" | "Low Risk";
  date: string;
};

type MonthlyStat = {
  month: string;
  submissions: number;
  flagged: number;
};

type SourceBreakdown = {
  source: string;
  matches: number;
  color?: string;
};

type StatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  subtitle: string;
  color: "blue" | "red" | "green" | "yellow";
};

// Data
const recentSubmissions: Submission[] = [
  { id: 1, student: "Alice Smith", title: "Research Paper on Climate Change", similarity: 85, status: "High Risk", date: "2024-03-15" },
  { id: 2, student: "Bob Johnson", title: "Essay on Modern Literature", similarity: 12, status: "Low Risk", date: "2024-03-14" },
  { id: 3, student: "Carol Williams", title: "History Analysis Paper", similarity: 45, status: "Medium Risk", date: "2024-03-13" },
  { id: 4, student: "David Brown", title: "Scientific Method Essay", similarity: 8, status: "Low Risk", date: "2024-03-12" },
  { id: 5, student: "Eva Davis", title: "Philosophy Term Paper", similarity: 92, status: "High Risk", date: "2024-03-11" },
];

const monthlyStats: MonthlyStat[] = [
  { month: 'Jan', submissions: 45, flagged: 8 },
  { month: 'Feb', submissions: 52, flagged: 12 },
  { month: 'Mar', submissions: 58, flagged: 15 },
  { month: 'Apr', submissions: 48, flagged: 10 },
  { month: 'May', submissions: 62, flagged: 18 },
];

const sourceBreakdown: SourceBreakdown[] = [
  { source: 'Academic Journals', matches: 45, color: '#3b82f6' },
  { source: 'Online Articles', matches: 30, color: '#6366f1' },
  { source: 'Student Papers', matches: 15, color: '#8b5cf6' },
  { source: 'Books', matches: 10, color: '#a855f7' },
];

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7'];

const StatCard = ({ icon: Icon, title, value, subtitle, color }: StatCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600'
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const SubmissionRow = ({ submission }: { submission: Submission }) => {
  const statusColors = {
    'High Risk': 'bg-red-100 text-red-800',
    'Medium Risk': 'bg-yellow-100 text-yellow-800',
    'Low Risk': 'bg-green-100 text-green-800'
  };

  return (
    <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50/50 transition-colors last:border-0">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{submission.student}</h4>
        <p className="text-sm text-muted-foreground truncate">{submission.title}</p>
      </div>
      <div className="flex items-center gap-4 ml-4">
        <div className="w-32 min-w-[8rem]">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Similarity</span>
            <span className="font-medium">{submission.similarity}%</span>
          </div>
          <Progress 
            value={submission.similarity} 
            className="h-2" 
            // indicatorClassName={
            //   submission.similarity > 80 ? 'bg-red-600' :
            //   submission.similarity > 40 ? 'bg-yellow-600' : 'bg-green-600'
            // }
          />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[submission.status]} whitespace-nowrap`}>
          {submission.status}
        </span>
        <span className="text-sm text-muted-foreground whitespace-nowrap">{submission.date}</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default function PlagiarismDetection() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Plagiarism Detection</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Monitor and analyze student submissions for originality
            </p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-medium">Active Monitoring</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={FileText}
            title="Total Submissions"
            value="1,248"
            subtitle="Last 30 days"
            color="blue"
          />
          <StatCard
            icon={AlertTriangle}
            title="Flagged Content"
            value="86"
            subtitle="Requires review"
            color="red"
          />
          <StatCard
            icon={Users}
            title="Active Students"
            value="324"
            subtitle="Submitted work"
            color="green"
          />
          <StatCard
            icon={Search}
            title="Average Similarity"
            value="18%"
            subtitle="Across all submissions"
            color="yellow"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start bg-background border">
            <TabsTrigger value="overview" className="px-4 py-2">Overview</TabsTrigger>
            <TabsTrigger value="submissions" className="px-4 py-2">Recent Submissions</TabsTrigger>
            <TabsTrigger value="analytics" className="px-4 py-2">Detailed Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyStats}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fill: '#6b7280' }}
                          tickLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis 
                          tick={{ fill: '#6b7280' }}
                          tickLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            borderColor: '#e5e7eb',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="submissions" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          name="Total Submissions" 
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="flagged" 
                          stroke="#ef4444" 
                          strokeWidth={2}
                          name="Flagged Submissions" 
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Source Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sourceBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="matches"
                          nameKey="source"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {sourceBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} matches`, 'Count']}
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            borderColor: '#e5e7eb',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
              </CardHeader>
              <div className="divide-y">
                {recentSubmissions.map((submission) => (
                  <SubmissionRow key={submission.id} submission={submission} />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Most Common Sources</h4>
                        <div className="space-y-3">
                          {sourceBreakdown.map((source) => (
                            <div key={source.source} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">{source.source}</span>
                                <span className="text-sm font-medium">{source.matches} matches</span>
                              </div>
                              <Progress 
                                value={(source.matches / 45) * 100} 
                                className="h-2 bg-gray-200"
                              >
                                <Progress 
                                  className="h-full bg-primary transition-all" 
                                  style={{ width: `${(source.matches / 45) * 100}%` }}
                                />
                              </Progress>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Risk Level Distribution</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-muted-foreground">High Risk {'>'}80%</span>
                              <span className="text-sm font-medium text-red-600">15%</span>
                            </div>
                            <Progress value={15} className="h-2 bg-red-100">
                              <Progress className="h-full bg-red-600" style={{ width: '15%' }} />
                            </Progress>
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Medium Risk (40-80%)</span>
                              <span className="text-sm font-medium text-yellow-600">35%</span>
                            </div>
                            <Progress value={35} className="h-2 bg-yellow-100">
                              <Progress className="h-full bg-yellow-600" style={{ width: '35%' }} />
                            </Progress>
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Low Risk {'<'}40%</span>
                              <span className="text-sm font-medium text-green-600">50%</span>
                            </div>
                            <Progress value={50} className="h-2 bg-green-100">
                              <Progress className="h-full bg-green-600" style={{ width: '50%' }} />
                            </Progress>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}