import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users'
import { MeUserUseCase } from '../me-user'

export function makeMeUserUseCase(): MeUserUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new MeUserUseCase(usersRepository)

  return useCase
}
