import { userSchema } from '@/lib/auth'
import { getContext } from '@/middlewares/context'
import { AppError } from '@/shared/errors/app-error'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found'
import { getUserPermissions } from '@/shared/utils/get-user-permissions'

import { DeleteUserData, UsersRepository } from '../repositories/users'

export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ id }: DeleteUserData) {
    const { user } = getContext()

    const authUser = userSchema.parse({ ...user })

    const { can } = getUserPermissions(user)

    if (!can('delete', authUser)) {
      throw new AppError('Não autorizado.')
    }

    const userExists = await this.usersRepository.findById({ id })

    if (!userExists) {
      throw new ResourceNotFoundError(
        'Nenhum usuário encontrado com o identificador informado.',
      )
    }

    await this.usersRepository.delete({ id })

    return { id }
  }
}
