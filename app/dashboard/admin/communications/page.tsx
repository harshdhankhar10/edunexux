import CommunicationsPage from '@/components/Dashboard/admin/communication/Communications';
import React from 'react'
import prisma from '@/lib/prisma';
import { NEXT_AUTH } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(NEXT_AUTH);
  if (!session) redirect('/login');
  
  const userInfo = await prisma.user.findUnique({
    where: { email: session?.user?.email! }
  });

  if(!userInfo || userInfo?.role !== 'ADMIN') redirect('/login');

  // Fetch announcements with creator details only (no receiver)
  const announcements = await prisma.announcement.findMany({
    include: {
      creator: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 50
  });

  // Transform data for client
  const announcementData = announcements.map(announcement => ({
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    priority: announcement.priority,
    sender: `${announcement.creator.firstName} ${announcement.creator.lastName}`,
    date: announcement.createdAt.toISOString().split('T')[0],
    status: new Date(announcement.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
      ? 'active' 
      : 'inactive'
  }));

  // Get stats
  const totalAnnouncements = await prisma.announcement.count();
  const activeAnnouncements = await prisma.announcement.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    }
  });

  return (
    <CommunicationsPage 
      initialAnnouncements={announcementData}
      initialStats={{
        totalAnnouncements,
        activeAnnouncements,
        unreadMessages: 0, // Initialize as 0
        emailCampaigns: 0  // Initialize as 0
      }}
    />
  );
}

export default page;