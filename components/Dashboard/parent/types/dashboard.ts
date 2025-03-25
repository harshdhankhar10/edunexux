
export interface Student {
  id: string;
  name: string;
  grade: string;
  avatar?: string;
}

export interface Attendance {
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export interface Grade {
  subject: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface Performance {
  subject: string;
  scores: { date: string; score: number }[];
}

export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    role: 'teacher' | 'admin';
    avatar?: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  teacher: {
    id: string;
    name: string;
    subject?: string;
    avatar?: string;
  };
  date: string;
  time: string;
  status: 'scheduled' | 'pending' | 'cancelled' | 'completed';
}

export interface Notification {
  id: string;
  type: 'announcement' | 'grade' | 'attendance' | 'message' | 'meeting';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: 'teacher' | 'admin';
    avatar?: string;
  };
  date: string;
  important: boolean;
}
