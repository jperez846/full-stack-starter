-- AlterTable
ALTER TABLE "KudosBoard" ADD COLUMN     "author" TEXT DEFAULT 'Anonymous',
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'General';

-- AlterTable
ALTER TABLE "KudosCard" ADD COLUMN     "author" TEXT DEFAULT 'Anonymous';

-- CreateTable
CREATE TABLE "KudosCardComment" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "author" TEXT DEFAULT 'Anonymous',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "KudosCardComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KudosCardComment" ADD CONSTRAINT "KudosCardComment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "KudosCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
