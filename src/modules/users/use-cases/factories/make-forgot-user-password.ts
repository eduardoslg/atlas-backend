import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users'
import { ForgotUserPasswordUseCase } from '../forgot-user-password'

export function makeForgotUserPasswordUseCase(): ForgotUserPasswordUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new ForgotUserPasswordUseCase(usersRepository)

  return useCase
}
