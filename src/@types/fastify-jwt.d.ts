import '@fastify/jwt'
import { Role } from '@prisma/client'

export type UserData = {
  userId: string
  clientId: string
  role: Role
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: UserData
    }
  }
}
