/*
  Warnings:

  - The `type` column on the `verification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "verificationType" AS ENUM ('EMAIL', 'FORGOT_PASSWORD');

-- AlterTable
ALTER TABLE "verification" DROP COLUMN "type",
ADD COLUMN     "type" "verificationType" NOT NULL DEFAULT 'EMAIL';

-- DropEnum
DROP TYPE "verificationtype";
