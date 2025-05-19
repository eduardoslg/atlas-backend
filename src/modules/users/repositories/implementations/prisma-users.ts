import { prisma } from '@/prisma'
import { Prisma, User } from '@prisma/client'

import {
  CreateUserData,
  DeleteUserData,
  FetchUsersData,
  FetchUsersResult,
  FindByIdData,
  UpdateUserData,
  UsersRepository,
  UsersResult,
} from '../users'

export class PrismaUsersRepository implements UsersRepository {
  async create({ name, email, role, clientId }: CreateUserData): Promise<User> {
    const output = await prisma.user.create({
      data: {
        name,
        email,
        role,
        clientId,
      },
    })

    return output
  }

  async update({ id, name, role, active }: UpdateUserData) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        role,
        active,
      },
    })

    return true
  }

  async fetch({
    page,
    limit,
    whereCondition,
  }: FetchUsersData): Promise<FetchUsersResult> {
    const offset = (page - 1) * limit

    const [count] = await prisma.$queryRaw<{ count: number }[]>`
      select count(u.id)
        from users u
        where u.deleted_at is null
      ${Prisma.raw(whereCondition)}
    `

    const result = await prisma.$queryRaw<UsersResult[]>`
      select u.id,
              u.name,
              u.email,
              u.created_at as "createdAt"
        from users u
        where u.deleted_at is null
        ${Prisma.raw(whereCondition)}
        order by u.id desc
        limit ${limit}
        offset ${offset}
    `

    return {
      count: Number(count.count),
      data: result,
    }
  }

  async me(
    userId: string,
  ): Promise<(User & { client: { id: string; businessName: string } }) | null> {
    const output = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        client: {
          select: {
            id: true,
            businessName: true,
          },
        },
      },
    })

    return output
  }

  async delete({ id, clientId }: DeleteUserData): Promise<boolean> {
    await prisma.user.update({
      data: {
        active: false,
        deletedAt: new Date(),
      },
      where: {
        id,
        clientId,
      },
    })

    return true
  }

  async findById({ id, clientId }: FindByIdData): Promise<User | null> {
    const output = await prisma.user.findUnique({
      where: {
        id,
        clientId,
      },
    })

    return output
  }

  async findByEmail(email: string): Promise<User | null> {
    const output = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return output
  }
}
