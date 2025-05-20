import { userSchema } from '@/lib/auth'
import { getContext } from '@/middlewares/context'
import { AppError } from '@/shared/errors/app-error'
import { getUserPermissions } from '@/shared/utils/get-user-permissions'

import { UsersRepository } from '../repositories/users'

type FetchUsersUseCaseData = {
  page: number
  limit: number
  search?: string
}

export class FetchUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ page, limit, search }: FetchUsersUseCaseData) {
    const { user } = getContext()

    const authUser = userSchema.parse({ ...user })

    const { can } = getUserPermissions(user)

    if (!can('list', authUser)) {
      throw new AppError('Não autorizado.')
    }

    const whereCondition = search
      ? ` and (u.name ilike '%${search}%' or 
                       u.email ilike '%${search}%') and
          u.client_id = ${user.clientId}`
      : `and u.client_id = ${user.clientId}`

    const output = await this.usersRepository.fetch({
      page,
      limit,
      whereCondition,
    })

    return output
  }
}
