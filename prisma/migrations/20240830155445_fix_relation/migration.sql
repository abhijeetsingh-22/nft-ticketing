/*
  Warnings:

  - You are about to drop the column `ticketId` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_ticketId_fkey";

-- DropIndex
DROP INDEX "orders_ticketId_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "ticketId";

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tickets_orderId_key" ON "tickets"("orderId");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
