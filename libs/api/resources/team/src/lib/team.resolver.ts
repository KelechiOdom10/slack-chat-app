import { UpdateTeamInput } from "./dto/updateTeam.input"
import { CreateTeamInput } from "./dto/createTeam.input"
import { Resolver, Query, Parent, Args, ID, ResolveProperty, Mutation } from "@nestjs/graphql"
import { TeamMember, Team } from "@slack-chat-app/api/shared/entities"
import { TeamService } from "./team.service"
import { ConflictException, NotFoundException } from "@nestjs/common"

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => [Team])
  async teams() {
    return this.teamService.getTeams({})
  }

  @Query(() => Team)
  async team(@Args("id", { type: () => ID }) id: string) {
    return this.teamService.getTeam({ id })
  }

  @ResolveProperty("members", () => [TeamMember])
  async getTeamMembers(@Parent() { id }: Team) {
    return this.teamService.getTeam({ id }).members()
  }

  @Mutation(() => Team)
  async createTeam(@Args("userId", { type: () => ID }) userId: string, @Args("input") input: CreateTeamInput) {
    const teamExists = await this.teamService.getTeam({ name: input.name })
    if (teamExists) {
      throw new ConflictException(`Team with name '${input.name}' already exists`)
    }

    return this.teamService.createTeam(userId, input)
  }

  @Mutation(() => Team)
  async updateTeam(@Args("input") input: UpdateTeamInput) {
    const teamExists = await this.teamService.getTeam({ id: input.id })
    if (!teamExists) {
      throw new NotFoundException("Team does not exist")
    }

    return this.teamService.updateTeam(input)
  }

  @Mutation(() => Boolean)
  async deleteTeam(@Args("teamId", { type: () => ID }) teamId: string) {
    const teamExists = await this.teamService.getTeam({ id: teamId })
    if (!teamExists) {
      throw new NotFoundException("Team does not exist")
    }

    return this.teamService.deleteTeam(teamId)
  }
}
