import { FastifyInstance } from 'fastify'

import { createUserController } from '../controllers/create-user'
import { deleteUserController } from '../controllers/delete-user'
import { fetchUsersController } from '../controllers/fetch-users'
import { meUserController } from '../controllers/me-user'

export async function usersRoutes(app: FastifyInstance) {
  app.register(createUserController)
  app.register(meUserController)
  app.register(fetchUsersController)
  app.register(deleteUserController)
}
