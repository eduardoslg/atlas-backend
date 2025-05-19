import { UsersRepository } from '../repositories/users'

type FetchUsersUseCaseData = {
  page: number
  limit: number
  clientId: string
  search?: string
}

export class FetchUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({
    page,
    limit,
    clientId,
    search,
  }: FetchUsersUseCaseData) {
    const whereCondition = search
      ? ` and (u.name ilike '%${search}%' or 
                       u.email ilike '%${search}%') and
          u.client_id = ${clientId}`
      : `and u.client_id = ${clientId}`

    const output = await this.usersRepository.fetch({
      page,
      limit,
      whereCondition,
    })

    return output
  }
}
