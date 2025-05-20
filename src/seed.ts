import { hash } from 'bcryptjs'

import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await hash('$4Hgxdugr', 8)

  await prisma.$transaction(async (tx) => {
    const client = await tx.client.create({
      data: {
        businessName: 'Zysoft',
      },
    })

    await tx.user.create({
      data: {
        name: 'Admin',
        email: 'admin@zysoft.com.br',
        password: passwordHash,
        role: Role.OWNER,
        clientId: client.id,
      },
    })
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
