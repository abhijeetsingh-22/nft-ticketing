/*
  Warnings:

  - Made the column `coverPhoto` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnail` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "coverPhoto" SET NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL;
