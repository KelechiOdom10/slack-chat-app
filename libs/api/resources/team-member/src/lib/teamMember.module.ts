import { Module } from "@nestjs/common"
import { PrismaModule } from "@slack-chat-app/api/shared/prisma"
import { TeamMemberResolver } from "./teamMember.resolver"
import { TeamMemberService } from "./teamMember.service"

@Module({
  imports: [PrismaModule],
  providers: [TeamMemberResolver, TeamMemberService],
})
export class TeamMemberModule {}
