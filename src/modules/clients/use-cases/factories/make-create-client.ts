import { PrismaClientsRepository } from '../../repositories/implementations/prisma-clients'
import { CreateClientUseCase } from '../create-client'

export function makeCreateClientUseCase(): CreateClientUseCase {
  const clientsRepository = new PrismaClientsRepository()

  const useCase = new CreateClientUseCase(clientsRepository)

  return useCase
}
