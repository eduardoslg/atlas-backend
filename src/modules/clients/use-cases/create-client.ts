import { AppError } from '@/shared/errors/app-error'

import { ClientsRepository, CreateClientData } from '../repositories/clients'

export class CreateClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}
  public async execute({ cnpj, businessName }: CreateClientData) {
    const clientExists = await this.clientsRepository.findByCnpj(cnpj)

    if (clientExists) {
      throw new AppError('client-already-exists')
    }

    const output = await this.clientsRepository.create({
      cnpj,
      businessName,
    })

    return output
  }
}
