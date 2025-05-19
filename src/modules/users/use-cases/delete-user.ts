import { ResourceNotFoundError } from '@/shared/errors/resource-not-found'

import { DeleteUserData, UsersRepository } from '../repositories/users'

export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ id, clientId }: DeleteUserData) {
    const userExists = await this.usersRepository.findById({ id, clientId })

    if (!userExists) {
      throw new ResourceNotFoundError(
        'Nenhum usuário encontrado com o identificador informado.',
      )
    }

    await this.usersRepository.delete({ id, clientId })

    return { id }
  }
}
