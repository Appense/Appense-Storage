import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'root@appense.com' },
    update: {},
    create: {
      email: 'root@appense.com',
      name: 'root',
      password,
      role: undefined
    }
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })