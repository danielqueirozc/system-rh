/*
  Warnings:

  - Made the column `employeeName` on table `budgets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "budgets" ALTER COLUMN "employeeName" SET NOT NULL;
