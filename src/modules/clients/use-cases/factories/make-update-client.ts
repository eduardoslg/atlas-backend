import { PrismaClientsRepository } from '../../repositories/implementations/prisma-clients'
import { UpdateClientUseCase } from '../update-client'

export function makeUpdateClientUseCase(): UpdateClientUseCase {
  const clientsRepository = new PrismaClientsRepository()

  const useCase = new UpdateClientUseCase(clientsRepository)

  return useCase
}
