-- CreateTable
CREATE TABLE "KudosBoard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KudosBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KudosCard" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "gifUrl" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "KudosCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KudosCard" ADD CONSTRAINT "KudosCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "KudosBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
