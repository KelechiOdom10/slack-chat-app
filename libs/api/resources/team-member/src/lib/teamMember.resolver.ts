import { Parent, ResolveField, Resolver, Query, Args, ID } from "@nestjs/graphql"
import { User, Team, TeamMember } from "@slack-chat-app/api/shared/entities"
import { TeamMemberService } from "./teamMember.service"

@Resolver(() => TeamMember)
export class TeamMemberResolver {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Query(() => [TeamMember])
  async teamMembers(@Args("teamId", { type: () => ID }) teamId: string) {
    return this.teamMemberService.getTeamMembers(teamId)
  }

  @ResolveField(() => User)
  async user(@Parent() { id }: TeamMember) {
    return this.teamMemberService.getTeamMember({ id }).user()
  }

  @ResolveField(() => Team)
  async team(@Parent() { id }: TeamMember) {
    return this.teamMemberService.getTeamMember({ id }).team()
  }
}
