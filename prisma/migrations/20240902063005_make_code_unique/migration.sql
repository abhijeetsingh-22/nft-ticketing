/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `entry_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "entry_codes_code_key" ON "entry_codes"("code");
