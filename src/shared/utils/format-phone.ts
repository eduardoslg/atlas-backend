export function formatPhone(phone: string) {
  if (phone) {
    phone = phone.replace(/\D/g, '')

    if (phone.length === 11) {
      return `(${phone.substr(0, 2)}) ${phone.substr(2, 5)}-${phone.substr(
        7,
        4,
      )}`
    }
    if (phone.length === 10) {
      return `(${phone.substr(0, 2)}) ${phone.substr(2, 4)}-${phone.substr(
        6,
        4,
      )}`
    }
  }

  return phone || ''
}
