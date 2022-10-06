import { Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { PrismaService } from "@slack-chat-app/api/shared/prisma"

import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 3333

  // Validation
  app.useGlobalPipes(new ValidationPipe())

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  await app.listen(port)

  Logger.log(`🚀 Application is running on http//localhost:${port}/graphql`)
}

bootstrap()
