import { ObjectType, Field, ID } from "@nestjs/graphql"
import { TeamMember } from "./teamMember.entity"

@ObjectType()
export class Team {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => TeamMember)
  members: TeamMember[]
}
