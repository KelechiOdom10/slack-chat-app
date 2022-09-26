import { Resolver, Query, Parent, Args, ID, ResolveProperty } from "@nestjs/graphql"
import { TeamMember, Team } from "@slack-chat-app/api/shared/entities"
import { TeamService } from "./team.service"

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
}
