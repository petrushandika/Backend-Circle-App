/*
  Warnings:

  - You are about to drop the column `avatar` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `reply` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reply" DROP COLUMN "avatar",
DROP COLUMN "fullName",
DROP COLUMN "username";
