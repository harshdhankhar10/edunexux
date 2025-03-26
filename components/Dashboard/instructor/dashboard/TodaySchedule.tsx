"use client";
import React from 'react';
import { Clock, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';

interface ClassScheduleItem {
  id: string;
  day: string;
  startTime: Date;
  endTime: Date;
  roomNumber: string | null;
  course: {
    courseCode: string;
    courseName: string;
  };
}

interface MeetingItem {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  zoomMeetingId: string;
  zoomPasscode: string | null;
  course: {
    courseCode: string;
    courseName: string;
  } | null;
}

interface TodayScheduleProps {
  classSchedule: ClassScheduleItem[];
  meetings: MeetingItem[];
}

const TodaySchedule = ({ classSchedule, meetings }: TodayScheduleProps) => {
  const formatTime = (date: Date) => {
    return format(date, 'h:mm a'); 
  };


  // Combine and sort all schedule items
  const allScheduleItems = [
    ...classSchedule.map(item => ({
      id: item.id,
      type: 'Class',
      title: item.course.courseName,
      courseCode: item.course.courseCode,
      startTime: item.startTime,
      endTime: item.endTime,
      room: item.roomNumber || 'TBD',
      isMeeting: false
    })),
    ...meetings.map(item => ({
      id: item.id,
      type: 'Meeting',
      title: item.title,
      courseCode: item.course?.courseCode || '',
      startTime: item.startTime,
      endTime: item.endTime,
      room: `Zoom: ${item.zoomMeetingId}`,
      isMeeting: true
    }))
  ].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDay = daysOfWeek[new Date().getDay()];

  return (
    <div className="mb-8">
      <Card className="animate-fade-up [animation-delay:300ms]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary" />
            Today's Schedule
          </CardTitle>
          <CardDescription>Your classes and meetings for {todayDay}</CardDescription>
        </CardHeader>
        <CardContent>
          {allScheduleItems.length > 0 ? (
            <div className="space-y-4">
              {allScheduleItems.map((item) => (
                <div key={item.id} className="flex items-center p-3 rounded-lg border border-slate-200 bg-white hover:shadow-sm transition-shadow">
                  <div className={`w-1 h-12 rounded-full mr-4 ${item.isMeeting ? 'bg-purple-500' : 'bg-primary'}`}></div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {item.courseCode ? `${item.courseCode}: ${item.title}` : item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(item.startTime)} - {formatTime(item.endTime)} | {item.room}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    item.isMeeting 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    <div className="flex items-center">
                      {item.isMeeting ? (
                        <>
                          <Video className="h-3 w-3 mr-1" />
                          Meeting
                        </>
                      ) : (
                        'Class'
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">No scheduled activities for today.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodaySchedule;