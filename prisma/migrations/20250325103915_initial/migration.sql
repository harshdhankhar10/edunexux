/*
  Warnings:

  - Added the required column `dueTime` to the `assignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assignments" ADD COLUMN     "dueTime" TIMESTAMP(3) NOT NULL;
