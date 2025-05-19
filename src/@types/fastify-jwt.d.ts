import '@fastify/jwt'

export type UserData = {
  userId: string
  clientId: string
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: UserData
    }
  }
}
