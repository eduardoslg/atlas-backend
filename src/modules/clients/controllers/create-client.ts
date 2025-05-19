import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { clientSchema } from '@/lib/auth/models/client'
import { authorization } from '@/middlewares/authorization'
import { NotAuthorizedError } from '@/shared/errors/not-authorized'
import { getUserPermissions } from '@/shared/utils/get-user-permissions'
import { removeSpecialCharacters } from '@/shared/utils/remove-special-characters'

import { makeCreateClientUseCase } from '../use-cases/factories/make-create-client'

export async function createClientController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/v1/clients',
    {
      onRequest: authorization,
      schema: {
        tags: ['Clientes'],
        summary: 'Criação de cliente',
        security: [{ bearerAuth: [] }],
        body: z.object({
          cnpj: z.string().refine((value) => removeSpecialCharacters(value)),
          businessName: z.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            cnpj: z.string().nullable(),
            businessName: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            deletedAt: z.date().nullable(),
          }),
        },
      },
    },
    async (request, reply) => {
      const user = request.user.sub
      const { businessName, cnpj } = request.body

      const authUser = clientSchema.parse(user)

      const { cannot } = getUserPermissions(user)

      if (cannot('create', authUser)) {
        throw new NotAuthorizedError('cannot-create-client')
      }

      const createClientUseCase = makeCreateClientUseCase()

      const output = await createClientUseCase.execute({ cnpj, businessName })

      return reply.status(201).send(output)
    },
  )
}
