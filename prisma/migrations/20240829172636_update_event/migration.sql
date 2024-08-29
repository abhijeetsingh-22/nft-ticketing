/*
  Warnings:

  - Made the column `numberOfTickets` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ticketPrice` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "numberOfTickets" SET NOT NULL,
ALTER COLUMN "ticketPrice" SET NOT NULL;
