import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"
import { TeamService } from "./team.service"
import { Team } from "./entities/team.entity"

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => [Team], { name: "team" })
  findAll() {
    return this.teamService.findAll()
  }

  @Query(() => Team, { name: "team" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.teamService.findOne(id)
  }

  @Mutation(() => Team)
  removeTeam(@Args("id", { type: () => Int }) id: number) {
    return this.teamService.remove(id)
  }
}
