/*
  Warnings:

  - Added the required column `venueAddress` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "venueAddress" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;
