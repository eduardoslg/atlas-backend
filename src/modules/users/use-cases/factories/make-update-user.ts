import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users'
import { UpdateUserUseCase } from '../update-user'

export function makeUpdateUserUseCase(): UpdateUserUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new UpdateUserUseCase(usersRepository)

  return useCase
}
