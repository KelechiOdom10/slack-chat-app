import { Channel, Prisma, PrismaClient, Status, Team } from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function main() {
  await prisma.channelMember.deleteMany()
  await prisma.message.deleteMany()
  await prisma.channel.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.team.deleteMany()
  await prisma.user.deleteMany()

  let teams: Team[] = []
  // let channels: Channel[] = []

  for (let index = 0; index < 5; index++) {
    const team = await prisma.team.create({
      data: {
        name: faker.company.name(),
        description: faker.company.catchPhraseDescriptor(),
      },
    })

    // const channel = await prisma.channel.create({
    //   data: {
    //     name: faker.company.name(),
    //     isVisible: faker.datatype.boolean(),
    //     teamId: team.id,
    //   },
    // })

    teams.push(team)
    // channels.push(channel)
  }

  for (let index = 0; index < 20; index++) {
    const data = {
      email: faker.internet.email(),
      fullName: faker.name.fullName(),
      username: `${faker.name.middleName("female")}_${faker.datatype.number(12)}`,
      statusMessage: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(Object.values(Status)),
      avatar: faker.image.avatar(),
    }
    const randomTeamId = faker.helpers.arrayElement(teams).id
    // const randomChannelId = faker.helpers.arrayElement(channels).id

    const user = await prisma.user.create({
      data,
    })

    // await prisma.message.create({
    //   data: {
    //     channelId: randomChannelId,
    //     userId: user.id,
    //     text: faker.lorem.sentence(),
    //   },
    // })

    await prisma.teamMember.create({
      data: {
        teamId: randomTeamId,
        userId: user.id,
      },
    })

    // await prisma.channelMember.create({
    //   data: {
    //     channelId: randomChannelId,
    //     userId: user.id,
    //   },
    // })
  }
}

main()
  .catch((e) => {
    console.log("Error seeding db", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
