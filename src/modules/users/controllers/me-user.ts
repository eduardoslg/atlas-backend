import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authorization } from '@/middlewares/authorization'

import { makeMeUserUseCase } from '../use-cases/factories/make-me-user'

export async function meUserController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/me',
    {
      onRequest: authorization,
      schema: {
        tags: ['Usuários'],
        summary: 'Detalhes do usuário',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            role: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId } = request.user.sub

      const meUserUseCase = makeMeUserUseCase()
      const output = await meUserUseCase.execute({ userId })

      return reply.status(200).send(output)
    },
  )
}
