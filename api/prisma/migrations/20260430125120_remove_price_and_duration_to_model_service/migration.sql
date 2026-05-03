/*
  Warnings:

  - You are about to drop the column `serviceDate` on the `schedulings` table. All the data in the column will be lost.
  - You are about to drop the column `basePrice` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `services` table. All the data in the column will be lost.
  - Added the required column `date` to the `services` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "schedulings" DROP COLUMN "serviceDate";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "basePrice",
DROP COLUMN "duration",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
