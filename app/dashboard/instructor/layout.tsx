
import React, { ReactNode } from 'react';
import Header from './Header';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {

    const session = await getServerSession();
    if (!session) {
      redirect("/login");
    }
  
    const userInfo = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });
  
    if (!userInfo || userInfo.role !== 'INSTRUCTOR') {
      redirect("/login");
    }
    
  


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
