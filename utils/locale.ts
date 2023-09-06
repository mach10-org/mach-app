/**
 * @param path Path
 * @returns The path without the locale
 */
const getPathWithoutLocale = (path: string) => {
  const matches = path.match(/^(\/(en|ja))?(.*)/)

  return matches ? matches[3] : ''
}

export { getPathWithoutLocale }
