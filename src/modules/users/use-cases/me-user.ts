import { userSchema } from '@/lib/auth'
import { getContext } from '@/middlewares/context'
import { AppError } from '@/shared/errors/app-error'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found'
import { getUserPermissions } from '@/shared/utils/get-user-permissions'

import { UsersRepository } from '../repositories/users'

type MeUserUseCaseData = {
  userId: string
}

export class MeUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ userId }: MeUserUseCaseData) {
    const { user: userContext } = getContext()

    const authUser = userSchema.parse(userContext)

    const { can } = getUserPermissions(userContext)

    if (!can('get', authUser)) {
      throw new AppError('Não autorizado.')
    }

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
