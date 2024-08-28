/*
  Warnings:

  - Added the required column `encoding` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable

ALTER TABLE "File" ADD COLUMN "encoding" TEXT DEFAULT 'unknown';
ALTER TABLE "File" ADD COLUMN "mimetype" TEXT DEFAULT 'application/octet-stream'; 
ALTER TABLE "File" ADD COLUMN "path" TEXT DEFAULT ''; 
ALTER TABLE "File" ALTER COLUMN "encoding" SET NOT NULL;
ALTER TABLE "File" ALTER COLUMN "mimetype" SET NOT NULL;
ALTER TABLE "File" ALTER COLUMN "path" SET NOT NULL;
