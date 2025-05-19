export class ResourceNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Recurso não encontrado')
  }
}
