/*
  Warnings:

  - You are about to drop the column `budgetDate` on the `budgets` table. All the data in the column will be lost.
  - Added the required column `date` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "budgetDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
