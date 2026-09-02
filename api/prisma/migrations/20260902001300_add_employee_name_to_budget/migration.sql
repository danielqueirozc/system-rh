-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_employeeId_fkey";

-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "employeeName" TEXT,
ALTER COLUMN "employeeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
