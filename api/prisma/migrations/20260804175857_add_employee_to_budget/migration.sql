/*
  Warnings:

  - Added the required column `employeeId` to the `budgets` table without a default value. This is not possible if the table is not empty.

  Como os budgets atuais são só dados de seed (recriados pelo prisma/seed.ts logo em seguida),
  esvaziamos a tabela antes de adicionar a coluna obrigatória em vez de usar um valor default.
*/
TRUNCATE TABLE "budgets";

-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "employeeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
