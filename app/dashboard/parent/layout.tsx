
import React from 'react';
import Navbar from "@/components/Dashboard/parent/navbar/NavBar";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {

  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const userInfo = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  if (!userInfo || userInfo.role !== 'PARENT') {
    redirect("/login");
  }
  


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-6 px-4 pt-24 md:pt-28">
        {children}
      </main>
    </div>
  );
};

export default Layout;
