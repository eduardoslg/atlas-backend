import { compare } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import jwt from 'jsonwebtoken'

import { env } from '@/env'
import { prisma } from '@/prisma'
import { AppError } from '@/shared/errors/app-error'

import { authenticateSchema } from '../schemas/authenticate'

export async function authenticateController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/sessions',
      { schema: authenticateSchema },
      async (request, reply) => {
        const { email, password } = request.body

        const user = await prisma.user.findFirst({
          where: {
            email,
            deletedAt: {
              equals: null,
            },
          },
        })

        if (!user) {
          throw new AppError('Usuário não encontrado!')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
          throw new AppError('Usuário ou senha inválidos!')
        }

        const token = jwt.sign(
          {
            sub: {
              userId: user.id,
              role: user.role,
              clientId: user.clientId,
            },
          },
          env.JWT_SECRET,
          {
            expiresIn: '30d',
          },
        )

        const output = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        }

        return reply.status(200).send(output)
      },
    )
}
