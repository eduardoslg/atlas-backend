import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authorization } from '@/middlewares/authorization'
import { Role } from '@prisma/client'

import { makeCreateUserUseCase } from '../use-cases/factories/make-create-user'

export async function createUserController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      onRequest: authorization,
      schema: {
        tags: ['Usuários'],
        summary: 'Criação de usuário',
        security: [{ bearerAuth: [] }],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          role: z.enum([Role.ADMIN, Role.MEMBER]),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            role: z.string(),
            createdAt: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, name, role } = request.body
      const { clientId } = request.user.sub

      const createUserUseCase = makeCreateUserUseCase()
      const output = await createUserUseCase.execute({
        name,
        email,
        clientId,
        role,
      })

      return reply.status(201).send(output)
    },
  )
}
