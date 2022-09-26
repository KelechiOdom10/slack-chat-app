import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "@slack-chat-app/api/shared/prisma"

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  getTeam(where: Prisma.TeamWhereUniqueInput) {
    return this.prismaService.team.findUnique({ where })
  }
  getTeams(params: { where?: Prisma.TeamWhereInput; orderBy?: Prisma.TeamOrderByWithRelationInput }) {
    return this.prismaService.team.findMany(params)
  }
}
