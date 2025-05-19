import { z } from 'zod'

import { roleSchema } from '../roles'

export const clientSchema = z.object({
  __typename: z.literal('Client').default('Client'),
  userId: z.string(),
  clientId: z.string(),
  role: roleSchema,
})

export type Client = z.infer<typeof clientSchema>
