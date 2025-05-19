import { FastifyRequest } from 'fastify'

import { UserData } from '@/@types/fastify-jwt'
import { prisma } from '@/prisma'
import { AppError } from '@/shared/errors/app-error'

export const authorization = async (request: FastifyRequest) => {
  try {
    const { sub } = await request.jwtVerify<{ sub: UserData }>()

    const user = await prisma.user.findFirst({
      where: {
        id: sub.userId,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!user) throw new AppError('Não autorizado!')

    request.user = { sub: { ...sub } }
  } catch (error) {
    throw new AppError('Não autorizado!')
  }
}
