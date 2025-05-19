import { ResourceNotFoundError } from '@/shared/errors/resource-not-found'

import { UsersRepository } from '../repositories/users'

type MeUserUseCaseData = {
  userId: string
}

export class MeUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ userId }: MeUserUseCaseData) {
    const user = await this.usersRepository.me(userId)

    if (!user)
      throw new ResourceNotFoundError(
        'Nenhum usuário encontrado com o identificador informado.',
      )

    const output = {
      id: user.id,
      email: user.email,
      name: user.name,
      clientId: user.clientId,
      role: user.role,
    }

    return output
  }
}
