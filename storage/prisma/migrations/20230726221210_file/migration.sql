/*
  Warnings:

  - Added the required column `extension` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` ADD COLUMN `extension` VARCHAR(191) NOT NULL,
    MODIFY `spaceTaken` BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `space` BIGINT NOT NULL DEFAULT 2000000000,
    ADD COLUMN `spaceLeft` BIGINT NOT NULL DEFAULT 2000000000,
    ADD COLUMN `spaceUsed` BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;
