"use client"
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/app/dashboard/admin/SideBar';
import Topbar from './Topbar';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // Close sidebar on mobile when changing routes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Auto-close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Tailwind's md breakpoint
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar 
        isMobile={isMobile} 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <div 
        className={`transition-all duration-300 ${
          isSidebarOpen && !isMobile ? 'ml-64' : 
          isMobile ? 'ml-0' : 'ml-20'
        }`}
      >
        <Topbar toggleSidebar={toggleSidebar} />
        
        <main className="animate-fade-in p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;