import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "@slack-chat-app/api/shared/prisma"

@Injectable()
export class TeamMemberService {
  constructor(private readonly prismaService: PrismaService) {}
  getTeamMembers(teamId: string) {
    return this.prismaService.teamMember.findMany({ where: { teamId } })
  }

  getTeamMember(where: Prisma.TeamMemberWhereUniqueInput) {
    return this.prismaService.teamMember.findUnique({ where })
  }
}
