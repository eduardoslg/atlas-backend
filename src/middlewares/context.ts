import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { AsyncLocalStorage } from 'node:async_hooks'

import { UserData } from '@/@types/fastify-jwt'

export const asyncLocalStorage = new AsyncLocalStorage()

export function getContext() {
  const context = asyncLocalStorage.getStore() as { user: UserData }

  return context
}

export function contextMiddleware(
  request: FastifyRequest,
  _: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  const user = request.user?.sub ?? null

  asyncLocalStorage.run({ user }, done)
}
