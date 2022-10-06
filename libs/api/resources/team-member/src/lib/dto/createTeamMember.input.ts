import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class CreateTeamMemberInput {
  @Field(() => ID)
  @IsNotEmpty()
  userId: string

  @Field(() => ID)
  @IsNotEmpty()
  teamId: string
}
