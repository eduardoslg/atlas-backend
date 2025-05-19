export function removeSpecialCharacters(value: string) {
  return value.replace(/[^a-zA-Z0-9]/gi, '')
}
