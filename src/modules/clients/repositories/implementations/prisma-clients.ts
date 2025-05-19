import { prisma } from '@/prisma'
import { Client } from '@prisma/client'

import {
  ClientsRepository,
  CreateClientData,
  UpdateClientData,
} from '../clients'

export class PrismaClientsRepository implements ClientsRepository {
  async create({ cnpj, businessName }: CreateClientData): Promise<Client> {
    const client = await prisma.client.create({
      data: {
        cnpj,
        businessName,
      },
    })

    return client
  }

  async update({ id, businessName }: UpdateClientData): Promise<Client> {
    const output = await prisma.client.update({
      data: {
        businessName,
      },
      where: {
        id,
      },
    })

    return output
  }

  async findById(id: string): Promise<Client | null> {
    const output = await prisma.client.findFirst({
      where: {
        id,
      },
    })

    return output
  }

  async findByCnpj(cnpj: string): Promise<Client | null> {
    const output = await prisma.client.findFirst({
      where: {
        cnpj,
      },
    })

    return output
  }
}
