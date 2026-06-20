/*
  Warnings:

  - You are about to drop the `schedulings` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('CONFIRMED', 'IN_PROGRESS', 'PENDING', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_clientId_fkey";

-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_serviceId_fkey";

-- DropTable
DROP TABLE "schedulings";

-- DropEnum
DROP TYPE "SchedulingStatus";

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "employeeId" TEXT,
    "status" "AppointmentStatus" NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
