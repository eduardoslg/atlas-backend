import { AppError } from '@/shared/errors/app-error'

import { ClientsRepository, UpdateClientData } from '../repositories/clients'

export class UpdateClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  public async execute({ id, businessName }: UpdateClientData) {
    const clientExists = await this.clientsRepository.findById(id)

    if (!clientExists) {
      throw new AppError('client-not-found')
    }

    await this.clientsRepository.update({ id, businessName })

    return {
      id,
      businessName,
    }
  }
}
