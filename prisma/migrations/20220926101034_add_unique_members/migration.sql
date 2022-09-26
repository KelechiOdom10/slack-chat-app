/*
  Warnings:

  - A unique constraint covering the columns `[userId,channelId]` on the table `channel_members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,teamId]` on the table `team_members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "channel_members_userId_channelId_key" ON "channel_members"("userId", "channelId");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_userId_teamId_key" ON "team_members"("userId", "teamId");
