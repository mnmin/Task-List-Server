/*
  Warnings:

  - You are about to drop the `CheckList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CheckList" DROP CONSTRAINT "CheckList_taskId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "topics" SET DATA TYPE TEXT[];

-- DropTable
DROP TABLE "CheckList";
