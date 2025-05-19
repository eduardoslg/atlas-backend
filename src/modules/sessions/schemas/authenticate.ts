import z from 'zod'

export const authenticateSchema = {
  tags: ['Login'],
  summary: 'Login de usuários',
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  response: {
    200: z.object({
      user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        role: z.enum(['OWNER', 'ADMIN', 'MEMBER']),
      }),
      token: z.string(),
    }),
  },
}
