import { PrismaClientsRepository } from '@/modules/clients/repositories/implementations/prisma-clients'

import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users'
import { CreateUserUseCase } from '../create-user'

export function makeCreateUserUseCase(): CreateUserUseCase {
  const usersRepository = new PrismaUsersRepository()
  const clientsRepository = new PrismaClientsRepository()

  const useCase = new CreateUserUseCase(usersRepository, clientsRepository)

  return useCase
}
