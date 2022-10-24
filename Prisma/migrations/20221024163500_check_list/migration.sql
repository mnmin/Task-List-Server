-- CreateTable
CREATE TABLE "CheckList" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(60) NOT NULL,
    "taskId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CheckList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckList" ADD CONSTRAINT "CheckList_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
