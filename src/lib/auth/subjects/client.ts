import { z } from 'zod'

import { clientSchema } from '../models/client'

export const clientSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('manage'),
  ]),
  z.union([z.literal('Client'), clientSchema]),
])

export type ClientSubject = z.infer<typeof clientSubject>
