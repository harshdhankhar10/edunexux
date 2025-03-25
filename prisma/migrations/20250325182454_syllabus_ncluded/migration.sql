/*
  Warnings:

  - You are about to drop the `assignment_submissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `assignments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AssignmentType" AS ENUM ('INDIVIDUAL', 'GROUP', 'PROJECT', 'QUIZ');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('VISIBLE', 'HIDDEN', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "GradingScheme" AS ENUM ('POINTS', 'PERCENTAGE', 'LETTER', 'RUBRIC');

-- CreateEnum
CREATE TYPE "SubmissionType" AS ENUM ('ONLINE', 'PAPER', 'EXTERNAL', 'NONE');

-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('EVERYONE', 'SELECTED', 'GROUPS');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "assignment_submissions" DROP CONSTRAINT "assignment_submissions_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "assignment_submissions" DROP CONSTRAINT "assignment_submissions_studentId_fkey";

-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_courseId_fkey";

-- DropTable
DROP TABLE "assignment_submissions";

-- DropTable
DROP TABLE "assignments";

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "courseId" TEXT NOT NULL,
    "type" "AssignmentType" NOT NULL DEFAULT 'INDIVIDUAL',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "points" INTEGER NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'VISIBLE',
    "grading" "GradingScheme" NOT NULL DEFAULT 'POINTS',
    "submission" "SubmissionType" NOT NULL DEFAULT 'ONLINE',
    "availability" "Availability" NOT NULL DEFAULT 'EVERYONE',
    "status" "AssignmentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentAttachment" (
    "id" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentAttachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentAttachment" ADD CONSTRAINT "AssignmentAttachment_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
