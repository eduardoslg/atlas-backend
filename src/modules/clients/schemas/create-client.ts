import z from 'zod'

import { removeSpecialCharacters } from '@/shared/utils/remove-special-characters'
export const createClientSchema = {
  tags: ['Clientes'],
  summary: 'Criação de cliente',
  security: [{ bearerAuth: [] }],
  body: z.object({
    cnpj: z.string().refine((value) => removeSpecialCharacters(value)),
    businessName: z.string(),
  }),
  response: {
    201: z.object({
      id: z.number(),
      cnpj: z.string().nullable(),
      businessName: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      deletedAt: z.date().nullable(),
    }),
  },
}
