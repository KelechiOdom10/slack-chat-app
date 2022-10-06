import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, Max, Min } from "class-validator"

@InputType()
export class CreateTeamInput {
  @Field()
  @IsNotEmpty()
  @Min(2)
  name: string

  @Field()
  @IsNotEmpty()
  @Min(3)
  @Max(255)
  description: string
}
