/*
  Warnings:

  - The primary key for the `Folder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `parentId` on the `Folder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentId_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "folderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_pkey",
DROP COLUMN "parentId",
ADD COLUMN     "parentFolderId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Folder_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Folder_id_seq";

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
