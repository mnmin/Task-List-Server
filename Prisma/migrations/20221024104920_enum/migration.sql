/*
  Warnings:

  - You are about to alter the column `taskName` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INPROGRESS', 'COMPLETED', 'TODO');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'TODO',
ALTER COLUMN "taskName" SET DATA TYPE VARCHAR(30);
