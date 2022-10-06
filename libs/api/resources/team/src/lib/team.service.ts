import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "@slack-chat-app/api/shared/prisma"
import { CreateTeamInput } from "./dto/createTeam.input"
import { UpdateTeamInput } from "./dto/updateTeam.input"

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  getTeam(where: Prisma.TeamWhereUniqueInput) {
    return this.prismaService.team.findUnique({ where })
  }

  getTeams(params: { where?: Prisma.TeamWhereInput; orderBy?: Prisma.TeamOrderByWithRelationInput }) {
    return this.prismaService.team.findMany(params)
  }

  async createTeam(userId: string, data: CreateTeamInput) {
    return this.prismaService.team.create({
      data: { ...data, members: { create: { userId, membershipType: "OWNER" } } },
    })
  }

  async updateTeam(input: UpdateTeamInput) {
    const { id, ...data } = input
    return this.prismaService.team.update({ where: { id: id }, data })
  }

  async deleteTeam(id: string) {
    const deleted = await this.prismaService.team.delete({ where: { id } })

    return !!deleted
  }
}
