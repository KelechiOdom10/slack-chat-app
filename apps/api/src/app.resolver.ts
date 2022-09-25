import { Float, Query, Resolver } from "@nestjs/graphql"

@Resolver()
export class AppResolver {
  @Query(() => Float)
  uptime() {
    return process.uptime()
  }
}
