import { Field, ID, InputType, PartialType } from "@nestjs/graphql"
import { CreateTeamInput } from "./createTeam.input"

@InputType()
export class UpdateTeamInput extends PartialType(CreateTeamInput) {
  @Field(() => ID)
  id: string
}
