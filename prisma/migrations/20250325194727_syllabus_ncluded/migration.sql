/*
  Warnings:

  - You are about to drop the column `description` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `content` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "priority" TEXT NOT NULL;
