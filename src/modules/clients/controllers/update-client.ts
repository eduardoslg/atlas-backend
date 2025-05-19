import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { clientSchema } from '@/lib/auth/models/client'
import { authorization } from '@/middlewares/authorization'
import { AppError } from '@/shared/errors/app-error'
import { getUserPermissions } from '@/shared/utils/get-user-permissions'

import { makeUpdateClientUseCase } from '../use-cases/factories/make-update-client'

export async function updateClientController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/v1/clients/:id',
    {
      onRequest: authorization,
      schema: {
        tags: ['Clientes'],
        summary: 'Atualização de cliente',
        security: [{ bearerAuth: [] }],
        params: z.object({
          id: z.coerce.string(),
        }),
        body: z.object({
          businessName: z.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            businessName: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = request.user.sub

      const { id } = request.params
      const { businessName } = request.body

      const authUser = clientSchema.parse({ ...user, clientId: id })

      const { cannot } = getUserPermissions(user)

      if (cannot('update', authUser)) {
        throw new AppError('not-authorized')
      }

      const updateClientUseCase = makeUpdateClientUseCase()

      const output = await updateClientUseCase.execute({
        id,
        businessName,
      })

      return reply.status(200).send(output)
    },
  )
}
