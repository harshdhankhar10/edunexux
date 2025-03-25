"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Bell,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  Book,
  MessageSquare,
  PieChart,
  ClipboardCheck,
  User,
  Menu,
  X,
  HelpCircle,
  CreditCard,
  Settings,
  BookOpen,
  Clock,
  Lightbulb,
  MessagesSquare,
  UserPlus,
  BarChart,
  Bot,
  Sparkles,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const Navbar = ({ userinfo }: { userinfo: UserProps }) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const mainNavItems = [
    {
      name: "Dashboard",
      path: "/dashboard/student",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Learning",
      path: "#",
      icon: <Book className="h-5 w-5" />,
      children: [
        {
          name: "Classrooms",
          path: "/dashboard/student/learning/classrooms",
          icon: <BookOpen className="h-5 w-5" />,
        },
        {
          name: "Materials",
          path: "/dashboard/student/learning/materials",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          name: "Assignments",
          path: "/dashboard/student/learning/assignments",
          icon: <ClipboardCheck className="h-5 w-5" />,
        },
      ],
    },
    {
      name: "Activities",
      path: "#",
      icon: <Calendar className="h-5 w-5" />,
      children: [
        {
          name: "Attendance",
          path: "/dashboard/student/activities/attendance",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          name: "Exams",
          path: "/dashboard/student/activities/exams",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          name: "Events",
          path: "/dashboard/student/activities/events",
          icon: <Clock className="h-5 w-5" />,
        },
      ],
    },
    {
      name: "Insights",
      path: "#",
      icon: <PieChart className="h-5 w-5" />,
      children: [
        {
          name: "Performance",
          path: "/dashboard/student/insights/performance",
          icon: <BarChart className="h-5 w-5" />,
        },
        {
          name: "Recommendations",
          path: "/dashboard/student/insights/recommendations",
          icon: <Lightbulb className="h-5 w-5" />,
        },
      ],
    },
    {
      name: "AI Tools",
      path: "#",
      icon: <Bot className="h-5 w-5" />,
      children: [
        {
          name: "AI Tutor",
          path: "/dashboard/student/personal/ai-tutor",
          icon: <Bot className="h-5 w-5" />,
        },
        // { name: 'Recommendations', path: '/dashboard/student/personal/recommendations', icon: <Sparkles className="h-5 w-5" /> },
      ],
    },
    {
      name: "Community",
      path: "#",
      icon: <MessageSquare className="h-5 w-5" />,
      children: [
        // { name: 'Discussions', path: '/dashboard/student/community/discussions', icon: <MessageSquare className="h-5 w-5" /> },
        // { name: 'Support', path: '/dashboard/student/community/support', icon: <HelpCircle className="h-5 w-5" /> },
        // { name: 'Parents Portal', path: '/dashboard/student//community/parents', icon: <UserPlus className="h-5 w-5" /> },
      ],
    },
    {
      name: "Fee Management",
      path: "/dashboard/student/fee/payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = async () => {
    toast.success("Logged out successfully");
    await signOut();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/dashboard/student" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#3A81F6] to-[#6C5BFF] flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-semibold text-xl hidden sm:inline-block text-gray-800">
                SmartLearn
              </span>
            </Link>
          </div>

          {!isMobile && (
            <nav className="hidden md:flex items-center gap-4">
              {mainNavItems.map((item) =>
                item.children ? (
                  <div key={item.name} className="relative group">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-10 px-4 flex items-center gap-2 text-gray-700 hover:bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 hover:text-[#3A81F6] transition-all duration-200 cursor-pointer ${
                        pathname === item.path
                          ? "bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 text-[#3A81F6]"
                          : ""
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                    </Button>
                    <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 ease-out">
                      <div className="bg-white rounded-lg shadow-xl ring-1 ring-gray-900/5 overflow-hidden">
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.path}
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 hover:text-[#3A81F6] transition-colors cursor-pointer ${
                                pathname === child.path
                                  ? "bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 text-[#3A81F6]"
                                  : ""
                              }`}
                            >
                              {child.icon}
                              <span>{child.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link key={item.name} href={item.path}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-10 px-4 flex items-center gap-2 text-gray-700 hover:bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 hover:text-[#3A81F6] transition-all duration-200 cursor-pointer ${
                        pathname === item.path
                          ? "bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 text-[#3A81F6]"
                          : ""
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                )
              )}
            </nav>
          )}

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center w-full  gap-2 hover:bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 cursor-pointer text-gray-700"
                >
                  <span className="justify-center items-center flex h-full w-full text-gray-700">
                    {userinfo.firstName} {userinfo.lastName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col items-center justify-center p-4 border-b">
                  <Avatar className="h-16 w-16 mb-2 border-2 border-gray-100">
                    <User className="h-6 w-6 text-gray-700" />
                  </Avatar>
                  <p className="font-medium text-gray-800">Alex Johnson</p>
                  <p className="text-xs text-gray-500">Student ID: ST12345</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="cursor-pointer hover:bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10"
                  >
                    <User className="mr-2 h-4 w-4 text-gray-700" />
                    <span className="text-gray-800">My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="cursor-pointer hover:bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10"
                  >
                    <Settings className="mr-2 h-4 w-4 text-gray-700" />
                    <span className="text-gray-800">Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10"
                >
                  <svg
                    className="mr-2 h-4 w-4 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span className="text-gray-800">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="hover:bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-700" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-700" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {isMobile && mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-slide-down max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-2">
            {mainNavItems.map((item) => (
              <React.Fragment key={item.name}>
                {item.children ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 p-3 font-medium text-gray-800">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <div className="ml-8 flex flex-col gap-1 border-l border-gray-100 pl-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className={`flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 hover:text-[#3A81F6] transition-colors cursor-pointer ${
                            pathname === child.path
                              ? "bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 text-[#3A81F6]"
                              : ""
                          }`}
                          onClick={toggleMobileMenu}
                        >
                          {child.icon}
                          <span>{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 hover:text-[#3A81F6] transition-colors cursor-pointer ${
                      pathname === item.path
                        ? "bg-gradient-to-r from-[#3A81F6]/10 to-[#6C5BFF]/10 text-[#3A81F6]"
                        : ""
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
