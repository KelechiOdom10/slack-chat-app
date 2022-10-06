import { CreateTeamMemberInput } from "./dto/createTeamMember.input"
import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "@slack-chat-app/api/shared/prisma"
import { UpdateTeamMemberInput } from "./dto/updateTeamMember.input"

@Injectable()
export class TeamMemberService {
  constructor(private readonly prismaService: PrismaService) {}
  getTeamMembers(teamId: string) {
    return this.prismaService.teamMember.findMany({ where: { teamId } })
  }

  getTeamMember(where: Prisma.TeamMemberWhereUniqueInput) {
    return this.prismaService.teamMember.findUnique({ where })
  }

  async addTeamMember(data: CreateTeamMemberInput) {
    return this.prismaService.teamMember.create({
      data,
    })
  }

  async updateTeamMember(data: UpdateTeamMemberInput) {
    return this.prismaService.teamMember.update({
      where: {
        id: data.id,
      },
      data: {
        membershipType: data.membershipType,
      },
    })
  }
}
