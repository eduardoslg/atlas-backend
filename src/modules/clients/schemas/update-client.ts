import z from 'zod'

export const updateClientSchema = {
  tags: ['Clientes'],
  summary: 'Atualização de cliente',
  security: [{ bearerAuth: [] }],
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    businessName: z.string(),
  }),
  response: {
    201: z.object({
      id: z.number(),
      businessName: z.string(),
    }),
  },
}
