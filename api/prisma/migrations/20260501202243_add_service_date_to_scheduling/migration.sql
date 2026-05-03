/*
  Warnings:

  - Added the required column `serviceDate` to the `schedulings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedulings" ADD COLUMN     "serviceDate" TIMESTAMP(3) NOT NULL;
