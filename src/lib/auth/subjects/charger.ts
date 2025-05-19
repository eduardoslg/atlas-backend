import { z } from 'zod'

import { chargerSchema } from '../models/charger'

export const chargerSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('update'),
    z.literal('get'),
    z.literal('list'),
    z.literal('delete'),
    z.literal('manage'),
  ]),
  z.union([z.literal('Charger'), chargerSchema]),
])

export type ChargerSubject = z.infer<typeof chargerSubject>
