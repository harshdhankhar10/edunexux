
// Teacher Profile
export const teacherProfile = {
  id: "t123456",
  name: "Dr. Sarah Mitchell",
  title: "Associate Professor",
  department: "Computer Science",
  email: "sarah.mitchell@university.edu",
  phone: "+1 (555) 123-4567",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  bio: "Dr. Sarah Mitchell is an award-winning educator with over 10 years of experience in computer science education. Her research focuses on interactive learning methods and educational technology.",
  office: "Science Building, Room 305",
  officeHours: "Monday & Wednesday 2:00 PM - 4:00 PM",
  joinedDate: "September 2014"
};

// Dashboard Statistics
export const dashboardStats = {
  activeCourses: 5,
  totalStudents: 187,
  upcomingDeadlines: 8,
  unreadMessages: 12,
  avgAttendance: 92,
  avgGrade: 85
};

// Current Classes
export const currentClasses = [
  {
    id: "cs101",
    courseCode: "CS 101",
    courseName: "Introduction to Programming",
    students: 42,
    progress: 65,
    nextClass: "Today, 10:00 AM",
    room: "Tech Hall 305"
  },
  {
    id: "cs230",
    courseCode: "CS 230",
    courseName: "Data Structures & Algorithms",
    students: 38,
    progress: 48,
    nextClass: "Tomorrow, 2:00 PM",
    room: "Science Center 110"
  },
  {
    id: "cs450",
    courseCode: "CS 450",
    courseName: "Machine Learning Fundamentals",
    students: 35,
    progress: 52,
    nextClass: "Today, 3:30 PM",
    room: "Tech Hall 201"
  },
  {
    id: "cs375",
    courseCode: "CS 375",
    courseName: "Web Application Development",
    students: 40,
    progress: 70,
    nextClass: "Wednesday, 1:00 PM",
    room: "Tech Hall 305"
  },
  {
    id: "cs490",
    courseCode: "CS 490",
    courseName: "Senior Project",
    students: 32,
    progress: 30,
    nextClass: "Thursday, 10:00 AM",
    room: "Engineering 405"
  }
];

// Recent Activity
export const recentActivity = [
  {
    id: "act1",
    type: "assignment",
    course: "CS 101",
    title: "Assignment #3 graded",
    timestamp: "Today, 9:32 AM",
    description: "You've completed grading for 'Python Functions & Libraries'"
  },
  {
    id: "act2",
    type: "message",
    course: "CS 230",
    title: "New message from Alex Thompson",
    timestamp: "Yesterday, 4:15 PM",
    description: "Question about the upcoming midterm exam"
  },
  {
    id: "act3",
    type: "attendance",
    course: "CS 450",
    title: "Attendance recorded",
    timestamp: "Yesterday, 2:30 PM",
    description: "32 of 35 students present (91%)"
  },
  {
    id: "act4",
    type: "material",
    course: "CS 375",
    title: "Course material uploaded",
    timestamp: "Oct 12, 11:20 AM",
    description: "You uploaded 'Week 7 - React Hooks & Context API'"
  },
  {
    id: "act5",
    type: "announcement",
    course: "CS 490",
    title: "Announcement posted",
    timestamp: "Oct 11, 3:45 PM",
    description: "Project proposals deadline extended to Friday"
  }
];

// Upcoming Deadlines
export const upcomingDeadlines = [
  {
    id: "dl1",
    course: "CS 101",
    title: "Assignment #4 due",
    dueDate: "Oct 15, 11:59 PM",
    type: "assignment",
    submissions: 28,
    totalStudents: 42
  },
  {
    id: "dl2",
    course: "CS 230",
    title: "Midterm Exam",
    dueDate: "Oct 18, 2:00 PM",
    type: "exam",
    room: "Science Center 210",
    duration: "90 minutes"
  },
  {
    id: "dl3",
    course: "CS 450",
    title: "Project Proposal",
    dueDate: "Oct 20, 11:59 PM",
    type: "project",
    submissions: 10,
    totalStudents: 35
  },
  {
    id: "dl4",
    course: "CS 375",
    title: "Lab Assignment #5",
    dueDate: "Oct 22, 11:59 PM",
    type: "lab",
    submissions: 15,
    totalStudents: 40
  }
];

// Teaching Schedule
export const teachingSchedule = [
  {
    id: "sch1",
    courseCode: "CS 101",
    courseName: "Introduction to Programming",
    day: "Monday",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    room: "Tech Hall 305",
    recurring: true
  },
  {
    id: "sch2",
    courseCode: "CS 230",
    courseName: "Data Structures & Algorithms",
    day: "Tuesday",
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    room: "Science Center 110",
    recurring: true
  },
  {
    id: "sch3",
    courseCode: "CS 450",
    courseName: "Machine Learning Fundamentals",
    day: "Monday",
    startTime: "3:30 PM",
    endTime: "5:00 PM",
    room: "Tech Hall 201",
    recurring: true
  },
  {
    id: "sch4",
    courseCode: "CS 375",
    courseName: "Web Application Development",
    day: "Wednesday",
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    room: "Tech Hall 305",
    recurring: true
  },
  {
    id: "sch5",
    courseCode: "CS 490",
    courseName: "Senior Project",
    day: "Thursday",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    room: "Engineering 405",
    recurring: true
  },
  {
    id: "sch6",
    title: "Department Meeting",
    day: "Friday",
    startTime: "1:00 PM",
    endTime: "2:00 PM",
    room: "Admin Building 105",
    recurring: true,
    type: "meeting"
  },
  {
    id: "sch7",
    title: "Student Advising Hours",
    day: "Wednesday",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    room: "Science Building, Room 305",
    recurring: true,
    type: "office-hours"
  }
];

// Student Performance Data
export const studentPerformanceData = [
  { month: 'Jan', avgGrade: 83, attendance: 90 },
  { month: 'Feb', avgGrade: 78, attendance: 87 },
  { month: 'Mar', avgGrade: 81, attendance: 85 },
  { month: 'Apr', avgGrade: 84, attendance: 88 },
  { month: 'May', avgGrade: 86, attendance: 92 },
  { month: 'Jun', avgGrade: 88, attendance: 91 },
  { month: 'Jul', avgGrade: 85, attendance: 89 },
  { month: 'Aug', avgGrade: 87, attendance: 93 },
  { month: 'Sep', avgGrade: 89, attendance: 94 },
  { month: 'Oct', avgGrade: 86, attendance: 92 },
];

// Assignment Completion Data
export const assignmentCompletionData = [
  { name: 'Assignment 1', onTime: 85, late: 10, notSubmitted: 5 },
  { name: 'Assignment 2', onTime: 78, late: 15, notSubmitted: 7 },
  { name: 'Assignment 3', onTime: 82, late: 12, notSubmitted: 6 },
  { name: 'Assignment 4', onTime: 75, late: 18, notSubmitted: 7 },
];

// Class Time Distribution
export const classTimeDistributionData = [
  { name: 'Lecture', value: 45 },
  { name: 'Discussion', value: 20 },
  { name: 'Hands-on Practice', value: 25 },
  { name: 'Assessment', value: 10 },
];

// Course Distribution by Level
export const courseDistributionData = [
  { name: 'Introductory', students: 82 },
  { name: 'Intermediate', students: 65 },
  { name: 'Advanced', students: 40 },
];

// Student List 
export const studentList = [
  {
    id: "s1001",
    name: "Emma Johnson",
    email: "emma.j@university.edu",
    courses: ["CS 101", "CS 375"],
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    attendance: 95,
    avgGrade: 92,
    lastActive: "Today, a few minutes ago"
  },
  {
    id: "s1002",
    name: "Michael Chen",
    email: "m.chen@university.edu",
    courses: ["CS 230", "CS 450"],
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    attendance: 88,
    avgGrade: 85,
    lastActive: "Yesterday, 4:30 PM"
  },
  {
    id: "s1003",
    name: "Sophia Rodriguez",
    email: "sophia.r@university.edu",
    courses: ["CS 101", "CS 490"],
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    attendance: 97,
    avgGrade: 94,
    lastActive: "Today, 11:20 AM"
  },
  {
    id: "s1004",
    name: "James Williams",
    email: "j.williams@university.edu",
    courses: ["CS 230", "CS 375"],
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    attendance: 80,
    avgGrade: 78,
    lastActive: "Yesterday, 1:15 PM"
  },
  {
    id: "s1005",
    name: "Olivia Davis",
    email: "o.davis@university.edu",
    courses: ["CS 101", "CS 450"],
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    attendance: 92,
    avgGrade: 88,
    lastActive: "Today, 9:45 AM"
  },
  {
    id: "s1006",
    name: "Ethan Brown",
    email: "e.brown@university.edu",
    courses: ["CS 230", "CS 490"],
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    attendance: 85,
    avgGrade: 82,
    lastActive: "Oct 12, 3:20 PM"
  },
  {
    id: "s1007",
    name: "Ava Martinez",
    email: "a.martinez@university.edu",
    courses: ["CS 101", "CS 375"],
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    attendance: 93,
    avgGrade: 90,
    lastActive: "Today, 2:10 PM"
  },
  {
    id: "s1008",
    name: "Noah Wilson",
    email: "n.wilson@university.edu",
    courses: ["CS 450", "CS 490"],
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    attendance: 89,
    avgGrade: 87,
    lastActive: "Yesterday, 5:45 PM"
  }
];

// Navigation Items
export const navigationItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: "Layout"
  },
  {
    title: "Courses",
    path: "/courses",
    icon: "BookOpen",
    subItems: [
      { title: "My Courses", path: "/courses" },
      { title: "Create Course", path: "/courses/create" },
      { title: "Course Materials", path: "/courses/materials" },
      { title: "Syllabus Builder", path: "/courses/syllabus" }
    ]
  },
  {
    title: "Students",
    path: "/students",
    icon: "Users",
    subItems: [
      { title: "Class Roster", path: "/students" },
      { title: "Attendance", path: "/students/attendance" },
      { title: "Performance", path: "/students/performance" },
      { title: "Academic Metrics", path: "/students/metrics" }
    ]
  },
  {
    title: "Assignments",
    path: "/assignments",
    icon: "FileText",
    subItems: [
      { title: "Create Assignment", path: "/assignments/create" },
      { title: "Grade Submissions", path: "/assignments/grade" },
      { title: "Assignment Analytics", path: "/assignments/analytics" },
      { title: "Plagiarism Detection", path: "/assignments/plagiarism" }
    ]
  },
  {
    title: "Assessments",
    path: "/assessments",
    icon: "ListChecks",
    subItems: [
      { title: "Create Tests", path: "/assessments/create" },
      { title: "Exam Scheduling", path: "/assessments/schedule" },
      { title: "Grade Management", path: "/assessments/grades" },
      { title: "Question Bank", path: "/assessments/questions" }
    ]
  },
  {
    title: "Communication",
    path: "/communication",
    icon: "MessageSquare",
    subItems: [
      { title: "Announcements", path: "/communication/announcements" },
      { title: "Messaging", path: "/communication/messages" },
      { title: "Parent Portal", path: "/communication/parents" },
      { title: "Discussion Forums", path: "/communication/forums" }
    ]
  },
  {
    title: "Resources",
    path: "/resources",
    icon: "Database",
    subItems: [
      { title: "Upload Materials", path: "/resources/upload" },
      { title: "Video Lectures", path: "/resources/videos" },
      { title: "External Resources", path: "/resources/external" }
    ]
  },
  {
    title: "Calendar",
    path: "/dashboard/teacher/calendar",
    icon: "Calendar"
  },
  {
    title: "Reports",
    path: "/reports",
    icon: "BarChart2",
    subItems: [
      { title: "Attendance Reports", path: "/reports/attendance" },
      { title: "Performance Analytics", path: "/reports/performance" },
      { title: "Grade Distribution", path: "/reports/grades" },
      { title: "Course Completion", path: "/reports/completion" }
    ]
  },
  {
    title: "AI Tools",
    path: "/ai-tools",
    icon: "Cpu",
    subItems: [
      { title: "Content Generation", path: "/ai-tools/content" },
      { title: "Grading Assistance", path: "/ai-tools/grading" },
      { title: "Learning Insights", path: "/ai-tools/insights" },
      { title: "Engagement Analytics", path: "/ai-tools/engagement" }
    ]
  },
  {
    title: "Settings",
    path: "/settings",
    icon: "Settings",
    subItems: [
      { title: "Profile", path: "/settings/profile" },
      { title: "Notifications", path: "/settings/notifications" },
      { title: "Grading Policies", path: "/settings/grading" }
    ]
  }
];
