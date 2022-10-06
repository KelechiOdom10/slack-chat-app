import { RegisterUserInput } from "./dto/registerUser"
import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "@slack-chat-app/api/shared/prisma"

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  getUser(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({ where })
  }

  getUsers(params: { where?: Prisma.UserWhereInput; orderBy?: Prisma.UserOrderByWithRelationInput }) {
    return this.prismaService.user.findMany(params)
  }

  createUser(data: RegisterUserInput) {
    return this.prismaService.user.create({ data })
  }
}
