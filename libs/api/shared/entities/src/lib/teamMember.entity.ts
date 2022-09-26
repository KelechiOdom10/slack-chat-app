import { Field, HideField, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { MembershipType } from "@prisma/client"
import { User } from "./user.entity"
import { Team } from "./team.entity"

registerEnumType(MembershipType, { name: "MembershipType" })

@ObjectType()
export class TeamMember {
  @Field(() => ID)
  id: string

  @Field(() => MembershipType)
  membershipType: MembershipType

  @Field(() => User)
  user: User

  @Field(() => Team)
  team: Team

  @Field(() => Date)
  createdAt: Date

  @HideField()
  teamId: string

  @HideField()
  userId: string
}
