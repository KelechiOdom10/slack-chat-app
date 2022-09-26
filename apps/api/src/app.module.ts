import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { AppResolver } from "./app.resolver"
import { PrismaModule } from "@slack-chat-app/api/shared/prisma"
import { join } from "path"
import { UserModule } from "@slack-chat-app/api/resources/user"
import { TeamModule } from "@slack-chat-app/api/resources/team"
import { TeamMemberModule } from "@slack-chat-app/api/resources/team-member"

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "apps/api/src/schema.graphql"),
      debug: false,
      playground: true,
    }),
    PrismaModule,
    UserModule,
    TeamModule,
    TeamMemberModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
