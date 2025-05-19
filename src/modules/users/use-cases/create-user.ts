import { hash } from 'bcryptjs'

import { mail } from '@/lib/mail'
import { ClientsRepository } from '@/modules/clients/repositories/clients'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found'
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists'
import { randomPassword } from '@/shared/utils/random-password'
import { Role } from '@prisma/client'

import { UsersRepository } from '../repositories/users'

type CreateUserUseCaserData = {
  name: string
  email: string
  role: Role
  clientId: string
}

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly clientsRepository: ClientsRepository,
  ) {}

  public async execute({
    name,
    email,
    role,
    clientId,
  }: CreateUserUseCaserData) {
    const clientExists = await this.clientsRepository.findById(clientId)

    if (!clientExists)
      throw new ResourceNotFoundError(
        'Nenhum cliente encontrado com o identificador informado.',
      )

    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists)
      throw new UserAlreadyExistsError(
        'Já existe um usuário com o email informado.',
      )

    const password = randomPassword(5)

    const passwordHash = await hash(password, 8)

    const output = await this.usersRepository.create({
      name,
      email,
      role,
      clientId,
      password: passwordHash,
    })

    await mail.sendMail({
      subject: 'Nova conta',
      name,
      email,
      body: mail.createdUserBody({ name, email, password }),
    })

    return {
      id: output.id,
      name,
      email,
      role,
      clientId,
      createdAt: output.createdAt,
    }
  }
}
