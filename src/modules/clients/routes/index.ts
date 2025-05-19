import { FastifyInstance } from 'fastify'

import { createClientController } from '../controllers/create-client'
import { updateClientController } from '../controllers/update-client'

export async function clientsRoutes(app: FastifyInstance) {
  app.register(createClientController)
  app.register(updateClientController)
}
