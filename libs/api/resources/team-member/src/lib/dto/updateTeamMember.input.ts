import { Field, ID, InputType } from "@nestjs/graphql"
import { MembershipType } from "@prisma/client"
import { IsEnum, IsNotEmpty } from "class-validator"

@InputType()
export class UpdateTeamMemberInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string

  @Field(() => ID)
  @IsNotEmpty()
  userId: string

  @Field(() => ID)
  @IsNotEmpty()
  teamId: string

  @Field(() => MembershipType)
  @IsEnum(MembershipType)
  membershipType: MembershipType
}
