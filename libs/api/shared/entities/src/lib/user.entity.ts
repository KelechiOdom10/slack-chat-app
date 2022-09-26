import { Field, HideField, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Status } from "@prisma/client"
import { TeamMember } from "./teamMember.entity"

registerEnumType(Status, {
  name: "Status",
  description: "User Status",
})
@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field(() => String)
  email: string

  @Field(() => String)
  fullName: string

  @Field(() => String)
  username: string

  @Field(() => String, { nullable: true })
  avatar?: string

  @Field(() => Status)
  status: Status

  @Field(() => String, { nullable: true })
  statusMessage?: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @HideField()
  password: string

  @Field(() => [TeamMember], { nullable: true })
  teams: TeamMember[]
}
