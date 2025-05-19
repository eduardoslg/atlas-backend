import { FastifyInstance } from 'fastify'

import { clientsRoutes } from './modules/clients/routes'
import { sessionsRoutes } from './modules/sessions/routes'
import { usersRoutes } from './modules/users/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(sessionsRoutes)
  app.register(usersRoutes)
  app.register(clientsRoutes)
}
