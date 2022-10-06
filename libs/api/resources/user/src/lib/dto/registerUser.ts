import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty } from "class-validator"

@InputType()
export class RegisterUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  fullName: string

  @Field()
  @IsNotEmpty()
  username: string
}
