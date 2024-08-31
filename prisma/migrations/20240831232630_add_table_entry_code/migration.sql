-- CreateTable
CREATE TABLE "entry_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "nftAddress" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entry_codes_pkey" PRIMARY KEY ("id")
);
