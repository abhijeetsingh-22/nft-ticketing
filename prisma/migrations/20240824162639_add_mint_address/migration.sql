/*
  Warnings:

  - Made the column `numberOfTicketsSold` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "numberOfTicketsSold" SET NOT NULL,
ALTER COLUMN "numberOfTicketsSold" SET DEFAULT 0;
