import { Role, User } from '@prisma/client'

export type CreateUserData = {
  name: string
  email: string
  password: string
}

export type UpdateUserData = {
  id: string
  name: string
  role: Role
  active: boolean
}

export type DeleteUserData = {
  id: string
}

export type FindByIdData = {
  id: string
}

export type FetchUsersData = {
  page: number
  limit: number
  whereCondition: string
}

export type UsersResult = {
  id: string
  name: string
  email: string
  role: Role
  createdAt: string
}

export type FetchUsersResult = {
  count: number
  data: UsersResult[]
}

export interface UsersRepository {
  create(data: CreateUserData): Promise<User>
  fetch(data: FetchUsersData): Promise<FetchUsersResult>
  me(
    userId: string,
  ): Promise<
    (User & { client?: { id: string; businessName: string } | null }) | null
  >
  delete(data: DeleteUserData): Promise<boolean>
  findById(data: FindByIdData): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
