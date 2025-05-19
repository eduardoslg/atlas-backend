import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users'
import { DeleteUserUseCase } from '../delete-user'

export function makeDeleteUserUseCase(): DeleteUserUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new DeleteUserUseCase(usersRepository)

  return useCase
}
