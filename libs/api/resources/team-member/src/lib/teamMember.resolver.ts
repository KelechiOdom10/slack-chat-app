import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common"
import { Parent, ResolveField, Resolver, Query, Args, ID, Mutation } from "@nestjs/graphql"
import { User, TeamMember } from "@slack-chat-app/api/shared/entities"
import { PrismaService } from "@slack-chat-app/api/shared/prisma"
import { CreateTeamMemberInput } from "./dto/createTeamMember.input"
import { UpdateTeamMemberInput } from "./dto/updateTeamMember.input"
import { TeamMemberService } from "./teamMember.service"

@Resolver(() => TeamMember)
export class TeamMemberResolver {
  constructor(private readonly teamMemberService: TeamMemberService, private readonly prismaService: PrismaService) {}

  @Query(() => [TeamMember])
  async teamMembers(@Args("teamId", { type: () => ID }) teamId: string) {
    return this.teamMemberService.getTeamMembers(teamId)
  }

  @ResolveField(() => User)
  async user(@Parent() { id }: TeamMember) {
    return this.teamMemberService.getTeamMember({ id }).user()
  }

  @ResolveField(() => Boolean)
  async team(@Parent() { id }: TeamMember) {
    return this.teamMemberService.getTeamMember({ id }).team()
  }

  @Mutation(() => TeamMember)
  async addTeamMember(@Args("userId") userId: string, @Args("input") input: CreateTeamMemberInput) {
    const teamPromise = this.prismaService.team.findUnique({ where: { id: input.teamId }, include: { members: true } })
    const userToAddPromise = this.prismaService.user.findUnique({
      where: { id: input.userId },
      include: { teams: true },
    })
    const [team, userToAdd] = await Promise.all([teamPromise, userToAddPromise])

    if (!team) {
      throw new NotFoundException(`Team does not exist`)
    }

    if (!userToAdd) {
      throw new NotFoundException(`User does not exist`)
    }

    const user = team.members.find((member) => member.userId === userId)
    if (!user || user.membershipType === "MEMBER") {
      throw new ForbiddenException("You are not authorised to add a new user to team")
    }

    const teamMemberExists = userToAdd.teams.find((team) => team.teamId === input.teamId)
    if (teamMemberExists) {
      throw new ConflictException("User is already a member of team")
    }

    return this.teamMemberService.addTeamMember(input)
  }

  @Mutation(() => TeamMember)
  async updateTeamMember(@Args("userId") userId: string, @Args("input") input: UpdateTeamMemberInput) {
    const teamPromise = this.prismaService.team.findUnique({ where: { id: input.teamId }, include: { members: true } })
    const userToUpdatePromise = this.prismaService.user.findUnique({
      where: { id: input.userId },
      include: { teams: true },
    })
    const [team, userToUpdate] = await Promise.all([teamPromise, userToUpdatePromise])

    if (!team) {
      throw new NotFoundException(`Team does not exist`)
    }

    if (!userToUpdate) {
      throw new NotFoundException(`User does not exist`)
    }

    const user = team.members.find((member) => member.userId === userId)
    if (!user || user.membershipType === "MEMBER") {
      throw new ForbiddenException("You are not authorised to add a new user to team")
    }

    const teamMemberExists = userToUpdate.teams.find((team) => team.teamId === input.teamId)
    if (!teamMemberExists) {
      throw new ConflictException("Team member doesn't exist in team")
    }

    return this.teamMemberService.updateTeamMember(input)
  }
}
