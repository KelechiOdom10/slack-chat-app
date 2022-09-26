/*
  Warnings:

  - The primary key for the `channel_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `team_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `channel_members` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `team_members` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "channel_members" DROP CONSTRAINT "channel_members_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "channel_members_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "team_members_pkey" PRIMARY KEY ("id");
