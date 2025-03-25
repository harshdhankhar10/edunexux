
import React from 'react';
import { Bell, Calendar } from 'lucide-react';
import { recentActivity, upcomingDeadlines } from '@/components/Dashboard/instructor/data/mockData';
import ActivityItem from '@/components/Dashboard/instructor/dashboard/ActivityItem';
import DeadlineItem from '@/components/Dashboard/instructor/dashboard/DeadlineItem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ActivitySection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Recent Activity */}
      <Card className="animate-fade-up">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates from your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.slice(0, 4).map((activity) => (
              <ActivityItem 
                key={activity.id}
                type={activity.type}
                course={activity.course}
                title={activity.title}
                timestamp={activity.timestamp}
                description={activity.description}
                className="animate-fade-up"
              />
            ))}
          </div>
          {recentActivity.length > 4 && (
            <div className="mt-4 text-center">
              <a href="/activity" className="text-primary hover:text-primary/80 text-sm font-medium">
                View all activity →
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card className="animate-fade-up [animation-delay:150ms]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Upcoming Deadlines
          </CardTitle>
          <CardDescription>Assignments and exams due soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <DeadlineItem 
                key={deadline.id}
                course={deadline.course}
                title={deadline.title}
                dueDate={deadline.dueDate}
                type={deadline.type}
                submissions={deadline.submissions}
                totalStudents={deadline.totalStudents}
                room={deadline.room}
                duration={deadline.duration}
                className="animate-fade-up"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitySection;
