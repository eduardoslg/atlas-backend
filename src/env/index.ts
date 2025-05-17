import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'test', 'staging', 'production']).default('dev'),
  JWT_SECRET: z.string().default('98388750f63fac47136942aaf8ac79ceasds'),

  FRONTEND_URL: z.string().default('https://localhost:5173'),

  MAILER_API_KEY: z
    .string()
    .default(
      'mlsn.b25ff8b094b382564d3350befb7d8bcbb382e41d2defefab41b23bc383c064bb',
    ),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables.', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
