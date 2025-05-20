import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authorization } from '@/middlewares/authorization'

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
        body: z
          .object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().refine(
              (value) => {
                const hasMinLength = value.length >= 8
                const hasUpperCase = /[A-Z]/.test(value)
                const hasNumber = /\d/.test(value)
                const hasSpecialChar = /[@$!%*?&#]/.test(value)

                return (
                  hasMinLength && hasUpperCase && hasNumber && hasSpecialChar
                )
              },
              {
                message:
                  'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial',
                path: ['password'],
              },
            ),
            confirmPassword: z.string(),
          })
          .refine(
            ({ password, confirmPassword }) => password === confirmPassword,
            {
              message: 'As senhas não batem.',
              path: ['password'],
            },
          ),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, name, password } = request.body

      const createUserUseCase = makeCreateUserUseCase()
      const output = await createUserUseCase.execute({
        name,
        email,
        password,
      })

      return reply.status(201).send(output)
    },
  )
}
