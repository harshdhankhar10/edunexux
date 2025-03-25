
import { Student, Attendance, Grade, Performance, Message, Meeting, Notification, Announcement } from '@/components/Dashboard/parent/types/dashboard';

export const student: Student = {
  id: '1',
  name: 'Alex Johnson',
  grade: '8th Grade',
  avatar: 'https://i.pravatar.cc/150?img=3'
};

export const attendanceData: Attendance[] = [
  { date: '2023-09-01', status: 'present' },
  { date: '2023-09-02', status: 'present' },
  { date: '2023-09-03', status: 'absent' },
  { date: '2023-09-04', status: 'present' },
  { date: '2023-09-05', status: 'late' },
  { date: '2023-09-08', status: 'present' },
  { date: '2023-09-09', status: 'present' },
  { date: '2023-09-10', status: 'excused' },
  { date: '2023-09-11', status: 'present' },
  { date: '2023-09-12', status: 'present' }
];

export const recentGrades: Grade[] = [
  { subject: 'Math', score: 85, maxScore: 100, date: '2023-09-10' },
  { subject: 'Science', score: 92, maxScore: 100, date: '2023-09-08' },
  { subject: 'English', score: 78, maxScore: 100, date: '2023-09-06' },
  { subject: 'History', score: 88, maxScore: 100, date: '2023-09-04' },
  { subject: 'Art', score: 95, maxScore: 100, date: '2023-09-02' }
];

export const performanceData: Performance[] = [
  { 
    subject: 'Math', 
    scores: [
      { date: '2023-05', score: 82 },
      { date: '2023-06', score: 79 },
      { date: '2023-07', score: 84 },
      { date: '2023-08', score: 80 },
      { date: '2023-09', score: 85 }
    ]
  },
  { 
    subject: 'Science', 
    scores: [
      { date: '2023-05', score: 88 },
      { date: '2023-06', score: 90 },
      { date: '2023-07', score: 87 },
      { date: '2023-08', score: 89 },
      { date: '2023-09', score: 92 }
    ]
  },
  { 
    subject: 'English', 
    scores: [
      { date: '2023-05', score: 76 },
      { date: '2023-06', score: 74 },
      { date: '2023-07', score: 75 },
      { date: '2023-08', score: 77 },
      { date: '2023-09', score: 78 }
    ]
  },
  { 
    subject: 'History', 
    scores: [
      { date: '2023-05', score: 85 },
      { date: '2023-06', score: 83 },
      { date: '2023-07', score: 86 },
      { date: '2023-08', score: 84 },
      { date: '2023-09', score: 88 }
    ]
  }
];

export const attendanceStats = {
  present: 42,
  absent: 3,
  late: 4,
  excused: 1
};

export const messages: Message[] = [
  {
    id: '1',
    sender: {
      id: 't1',
      name: 'Mrs. Smith',
      role: 'teacher',
      avatar: 'https://i.pravatar.cc/150?img=32'
    },
    content: 'Alex did very well on the math test today. Keep up the good work!',
    timestamp: '2023-09-12T14:30:00Z',
    read: false
  },
  {
    id: '2',
    sender: {
      id: 't2',
      name: 'Mr. Johnson',
      role: 'teacher',
      avatar: 'https://i.pravatar.cc/150?img=59'
    },
    content: 'Please remind Alex to bring the science project materials tomorrow.',
    timestamp: '2023-09-11T10:15:00Z',
    read: true
  },
  {
    id: '3',
    sender: {
      id: 'a1',
      name: 'Principal Davis',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=68'
    },
    content: 'We\'re having a parent-teacher conference day next Friday. Would you be available to meet?',
    timestamp: '2023-09-10T09:00:00Z',
    read: true
  }
];

export const meetings: Meeting[] = [
  {
    id: 'm1',
    title: 'Math Progress Discussion',
    teacher: {
      id: 't1',
      name: 'Mrs. Smith',
      subject: 'Mathematics',
      avatar: 'https://i.pravatar.cc/150?img=32'
    },
    date: '2023-09-15',
    time: '15:00',
    status: 'scheduled'
  },
  {
    id: 'm2',
    title: 'Science Project Review',
    teacher: {
      id: 't2',
      name: 'Mr. Johnson',
      subject: 'Science',
      avatar: 'https://i.pravatar.cc/150?img=59'
    },
    date: '2023-09-20',
    time: '14:30',
    status: 'pending'
  },
  {
    id: 'm3',
    title: 'Parent-Teacher Conference',
    teacher: {
      id: 'a1',
      name: 'Principal Davis',
      avatar: 'https://i.pravatar.cc/150?img=68'
    },
    date: '2023-09-22',
    time: '16:00',
    status: 'scheduled'
  }
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'grade',
    title: 'New Grade Posted',
    content: 'Alex received an 85% on the recent Math test.',
    timestamp: '2023-09-12T14:30:00Z',
    read: false
  },
  {
    id: 'n2',
    type: 'message',
    title: 'New Message from Mr. Johnson',
    content: 'Please remind Alex to bring the science project materials tomorrow.',
    timestamp: '2023-09-11T10:15:00Z',
    read: true
  },
  {
    id: 'n3',
    type: 'attendance',
    title: 'Attendance Alert',
    content: 'Alex was marked late for class on September 5.',
    timestamp: '2023-09-05T08:45:00Z',
    read: true
  },
  {
    id: 'n4',
    type: 'announcement',
    title: 'School Event: Science Fair',
    content: 'The annual science fair will be held next month. Start preparing your projects!',
    timestamp: '2023-09-09T11:00:00Z',
    read: false
  },
  {
    id: 'n5',
    type: 'meeting',
    title: 'Meeting Scheduled',
    content: 'You have a meeting with Mrs. Smith on September 15 at 3:00 PM.',
    timestamp: '2023-09-08T13:20:00Z',
    read: true
  }
];

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'Annual Science Fair',
    content: 'The annual science fair will be held on October 15th. Students should start preparing their projects. There will be prizes for the top three projects in each grade!',
    author: {
      name: 'Mr. Johnson',
      role: 'teacher',
      avatar: 'https://i.pravatar.cc/150?img=59'
    },
    date: '2023-09-09',
    important: true
  },
  {
    id: 'a2',
    title: 'Parent-Teacher Conference Day',
    content: 'We will be holding our fall parent-teacher conferences on September 22nd. Please sign up for a time slot to meet with your child\'s teachers.',
    author: {
      name: 'Principal Davis',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=68'
    },
    date: '2023-09-08',
    important: true
  },
  {
    id: 'a3',
    title: 'School Holiday Reminder',
    content: 'Remember that there will be no school on Monday, September 25th due to the staff development day.',
    author: {
      name: 'Admin Office',
      role: 'admin'
    },
    date: '2023-09-07',
    important: false
  },
  {
    id: 'a4',
    title: 'After-School Program Changes',
    content: 'Starting next week, the after-school program will run until 5:30 PM instead of 5:00 PM to accommodate working parents.',
    author: {
      name: 'Mrs. Wilson',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=45'
    },
    date: '2023-09-06',
    important: false
  }
];
