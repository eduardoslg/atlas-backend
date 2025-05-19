import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users'
import { FetchUsersUseCase } from '../fetch-users'

export function makeFetchUsersUseCase(): FetchUsersUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new FetchUsersUseCase(usersRepository)

  return useCase
}
