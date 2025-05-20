import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authorization } from '@/middlewares/authorization'

import { makeDeleteUserUseCase } from '../use-cases/factories/make-delete-user'

export async function deleteUserController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/users/:id',
    {
      onRequest: authorization,
      schema: {
        tags: ['Usuários'],
        summary: 'Deletar um usuário',
        security: [{ bearerAuth: [] }],
        params: z.object({
          id: z.coerce.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const deleteUserUseCase = makeDeleteUserUseCase()
      const output = await deleteUserUseCase.execute({
        id,
      })

      return reply.status(201).send(output)
    },
  )
}
