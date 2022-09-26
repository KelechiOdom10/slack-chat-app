import { Module } from "@nestjs/common"
import { TeamService } from "./team.service"
import { TeamResolver } from "./team.resolver"
import { PrismaModule } from "@slack-chat-app/api/shared/prisma"

@Module({
  imports: [PrismaModule],
  providers: [TeamResolver, TeamService],
})
export class TeamModule {}
