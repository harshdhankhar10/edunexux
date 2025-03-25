import AnnouncementPage from '@/components/Dashboard/instructor/communication/announcement/Announcement'
import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/lib/auth'


const page = async () => {
  const session = await getServerSession(NEXT_AUTH)
  const userinfo = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    }
  })

  const creatorId = userinfo?.id

  const announcements = await prisma.announcement.findMany({
    where: {
      creatorId
    }
  })

  return (
    <>
      <AnnouncementPage announcements={announcements} />
    </>
  )
}

export default page