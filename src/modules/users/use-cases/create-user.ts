import { hash } from 'bcryptjs'

import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists'

import { UsersRepository } from '../repositories/users'

type CreateUserUseCaserData = {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ name, email, password }: CreateUserUseCaserData) {
    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists)
      throw new UserAlreadyExistsError(
        'Já existe um usuário com o email informado.',
      )

    const passwordHash = await hash(password, 8)

    const output = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return {
      id: output.id,
      name,
      email,
    }
  }
}
