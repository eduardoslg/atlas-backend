import { Client } from '@prisma/client'

export type CreateClientData = {
  cnpj: string
  businessName: string
}

export type UpdateClientData = {
  id: string
  businessName: string
}

export interface ClientsRepository {
  create(data: CreateClientData): Promise<Client>
  update(data: UpdateClientData): Promise<Client>
  findById(id: string): Promise<Client | null>
  findByCnpj(cnpj: string): Promise<Client | null>
}
