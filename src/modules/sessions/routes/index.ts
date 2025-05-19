import { FastifyInstance } from 'fastify'

import { authenticateController } from '../controller/authenticate'

export async function sessionsRoutes(app: FastifyInstance) {
  app.register(authenticateController)
}
