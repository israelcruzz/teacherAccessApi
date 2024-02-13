/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "student_image_key" ON "student"("image");
