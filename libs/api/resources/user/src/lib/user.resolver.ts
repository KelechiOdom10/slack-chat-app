import { Args, ID, Parent, Query, ResolveProperty, Resolver } from "@nestjs/graphql"
import { TeamMember, User } from "@slack-chat-app/api/shared/entities"
import { UserService } from "./user.service"

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.getUsers({})
  }

  @Query(() => User)
  async user(@Args("id", { type: () => ID }) id: string) {
    return this.userService.getUser({ id })
  }

  @ResolveProperty("teams", () => [TeamMember])
  async getTeams(@Parent() { id }: User) {
    return this.userService.getUser({ id }).teams()
  }
}
