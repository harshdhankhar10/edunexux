import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await getServerSession(NEXT_AUTH)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const courseId = searchParams.get('courseId')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  if (!courseId || !startDate || !endDate) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {
    // Verify the user is the instructor of this course
    const isInstructor = await prisma.course.findFirst({
      where: {
        id: courseId,
        instructor: { email: session.user.email }
      }
    })

    if (!isInstructor) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const attendance = await prisma.attendance.findMany({
      where: {
        courseId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }
    })

    return NextResponse.json(attendance)
  } catch (error) {
    console.error('Error fetching attendance:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attendance records' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(NEXT_AUTH)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { studentId, courseId, date, status, note } = await request.json()

  try {
    // Verify the user is the instructor of this course
    const isInstructor = await prisma.course.findFirst({
      where: {
        id: courseId,
        instructor: { email: session.user.email }
      }
    })

    if (!isInstructor) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Create new attendance record
    const attendance = await prisma.attendance.create({
      data: {
        status,
        note,
        date: new Date(date),
        course: { connect: { id: courseId } },
        student: { connect: { id: studentId } }
      }
    })

    return NextResponse.json(attendance)
  } catch (error) {
    console.error('Error creating attendance:', error)
    return NextResponse.json(
      { error: 'Failed to create attendance record' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(NEXT_AUTH)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, status, note } = await request.json()

  try {
    // Verify the user is the instructor of this course
    const existingRecord = await prisma.attendance.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            instructor: {
              select: {
                email: true
              }
            }
          }
        }
      }
    })

    if (!existingRecord || existingRecord.course.instructor.email !== session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Update attendance record
    const attendance = await prisma.attendance.update({
      where: { id },
      data: {
        status,
        note
      }
    })

    return NextResponse.json(attendance)
  } catch (error) {
    console.error('Error updating attendance:', error)
    return NextResponse.json(
      { error: 'Failed to update attendance record' },
      { status: 500 }
    )
  }
}