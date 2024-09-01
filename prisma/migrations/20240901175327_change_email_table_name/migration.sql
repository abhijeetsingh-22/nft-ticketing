/*
  Warnings:

  - You are about to drop the `EarlyAccessEmail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EarlyAccessEmail";

-- CreateTable
CREATE TABLE "newsletter_emails" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isNotified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_emails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_emails_email_key" ON "newsletter_emails"("email");
