/*
  Warnings:

  - Added the required column `size` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN "size" TEXT; 
UPDATE "File" SET "size" = '0'; 
ALTER TABLE "File" ALTER COLUMN "size" SET NOT NULL;
