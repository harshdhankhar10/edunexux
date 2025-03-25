/*
  Warnings:

  - Added the required column `credits` to the `Syllabus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Syllabus" ADD COLUMN     "credits" INTEGER NOT NULL;
