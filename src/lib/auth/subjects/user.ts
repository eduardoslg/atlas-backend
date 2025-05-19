import { z } from 'zod'

import { userSchema } from '../models/user'

export const userSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('update'),
    z.literal('get'),
    z.literal('delete'),
    z.literal('list'),
    z.literal('manage'),
  ]),
  z.union([z.literal('User'), userSchema]),
])

export type UserSubject = z.infer<typeof userSubject>
