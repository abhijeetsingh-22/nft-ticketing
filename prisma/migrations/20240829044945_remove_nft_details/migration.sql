/*
  Warnings:

  - You are about to drop the column `mintAddress` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "mintAddress",
DROP COLUMN "projectId";
