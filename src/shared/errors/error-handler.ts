import { AxiosError } from 'axios'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { env } from '@/env'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'

import { AppError } from './app-error'
import { NotAuthorizedError } from './not-authorized'

export function errorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof NotAuthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  if (error instanceof ZodError) {
    const message = {
      message: 'validation-error',
      path: error.issues[0].path,
    }

    return reply.status(400).send(message)
  }

  if (error.validationContext === 'querystring') {
    const message = {
      message: error?.validation?.[0].message ?? 'Error message',
    }

    return reply.status(400).send(message)
  }

  if (error instanceof AppError) {
    return reply.status(404).send({ message: error.message })
  }

  if (error instanceof AxiosError) {
    return reply.status(error.response?.status ?? 400).send({
      message:
        error.response?.data?.message ?? error.response?.data ?? error.message,
    })
  }

  if (error instanceof PrismaClientInitializationError) {
    return reply.status(502).send()
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    console.error(error)
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: error })
}
