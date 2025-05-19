import crypto from 'node:crypto'

export function randomPassword(number: number = 8) {
  return crypto.randomBytes(number).toString('hex').toUpperCase()
}
