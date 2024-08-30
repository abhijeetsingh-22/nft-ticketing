/*
  Warnings:

  - You are about to drop the column `price` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `tickets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ticketId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `tickets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_ticketId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "price",
ALTER COLUMN "ticketId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "ownerId",
DROP COLUMN "price",
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_ticketId_key" ON "orders"("ticketId");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_id_fkey" FOREIGN KEY ("id") REFERENCES "orders"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;
