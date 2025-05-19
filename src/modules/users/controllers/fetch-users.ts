import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authorization } from '@/middlewares/authorization'

import { makeFetchUsersUseCase } from '../use-cases/factories/make-fetch-users'

export async function fetchUsersController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/list/table',
    {
      onRequest: authorization,
      schema: {
        tags: ['Usuários'],
        summary: 'Listagem de usuários',
        security: [{ bearerAuth: [] }],
        querystring: z.object({
          page: z.coerce
            .number()
            .default(1)
            .transform((arg) => arg || 1),
          limit: z.coerce
            .number()
            .default(20)
            .transform((arg) => arg || 20),
          search: z.coerce.string().optional(),
        }),
        response: {
          201: z.object({
            count: z.number(),
            data: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                createdAt: z.coerce.string(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, limit, search } = request.query
      const { clientId } = request.user.sub

      const fetchUsersUseCase = makeFetchUsersUseCase()
      const output = await fetchUsersUseCase.execute({
        page,
        limit,
        search,
        clientId,
      })

      return reply.status(201).send(output)
    },
  )
}
