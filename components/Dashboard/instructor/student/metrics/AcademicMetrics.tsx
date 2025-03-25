"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar } from 'recharts';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, GraduationCap, LineChart as LineChartIcon, Target } from "lucide-react";

// Temporary Data
const gradeDistribution = [
  { subject: 'Mathematics', current: 92, average: 85 },
  { subject: 'Physics', current: 88, average: 82 },
  { subject: 'Chemistry', current: 95, average: 80 },
  { subject: 'Biology', current: 85, average: 78 },
  { subject: 'English', current: 90, average: 83 },
];

const skillMetrics = [
  { skill: 'Problem Solving', value: 90 },
  { skill: 'Critical Thinking', value: 85 },
  { skill: 'Research', value: 75 },
  { skill: 'Communication', value: 88 },
  { skill: 'Team Work', value: 92 },
];

const progressionData = [
  { semester: 'Sem 1', gpa: 3.5 },
  { semester: 'Sem 2', gpa: 3.7 },
  { semester: 'Sem 3', gpa: 3.6 },
  { semester: 'Sem 4', gpa: 3.8 },
  { semester: 'Sem 5', gpa: 3.9 },
];

const MetricCard = ({ icon: Icon, title, value, subtitle, color = "blue" }: { 
  icon: any, 
  title: string, 
  value: string, 
  subtitle: string,
  color?: string 
}) => (
  <Card className="p-6">
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 bg-blue-100 rounded-lg`}>
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="space-y-2">
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  </Card>
);

const SkillBar = ({ skill, value }: { skill: string, value: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <span className="text-sm font-medium text-gray-700">{skill}</span>
      <span className="text-sm font-medium text-gray-700">{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);

export default function AcademicMetrics() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Academic Metrics</h1>
            <p className="text-gray-500 mt-1">Detailed academic performance analysis</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-medium">2023-2024</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Award}
            title="Current GPA"
            value="3.9"
            subtitle="Top 5% of class"
          />
          <MetricCard
            icon={Target}
            title="Completion Rate"
            value="95%"
            subtitle="Course completion"
          />
          <MetricCard
            icon={LineChartIcon}
            title="Academic Growth"
            value="+15%"
            subtitle="Year over year"
          />
          <MetricCard
            icon={BookOpen}
            title="Study Hours"
            value="168"
            subtitle="This semester"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Grade Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" name="Your Grade" fill="#2563eb" />
                  <Bar dataKey="average" name="Class Average" fill="#93c5fd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Academic Skills Assessment</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Skills" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="progression" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="progression">Academic Progression</TabsTrigger>
            <TabsTrigger value="skills">Detailed Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="progression">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">GPA Progression</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[2, 4]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="gpa" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Skills Breakdown</h3>
              <div className="space-y-6">
                {skillMetrics.map((skill) => (
                  <SkillBar key={skill.skill} skill={skill.skill} value={skill.value} />
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}