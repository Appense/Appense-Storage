/*
  Warnings:

  - You are about to drop the column `spaceTaken` on the `file` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `size` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `spaceTaken`,
    ADD COLUMN `size` BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `File_id_key` ON `File`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);
