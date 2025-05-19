import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users'
import { ResetUserPasswordUseCase } from '../reset-user-password'

export function makeResetUserPasswordUseCase(): ResetUserPasswordUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new ResetUserPasswordUseCase(usersRepository)

  return useCase
}
