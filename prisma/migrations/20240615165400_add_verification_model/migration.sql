-- CreateEnum
CREATE TYPE "verificationtype" AS ENUM ('FORGOT_PASSWORD', 'EMAIL');

-- CreateTable
CREATE TABLE "verification" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "verificationtype" NOT NULL DEFAULT 'EMAIL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_key" ON "verification"("token");
