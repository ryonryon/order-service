export const makeUpdateItemSyntax = (items: [String, String | Number | null][]): string => {
  return items
    .filter(i => {
      const [_, value] = i
      return value !== null
    })
    .reduce((merged, item) => {
      const [name, value] = item
      if (typeof value === 'string') return `${merged},${name} = "${value}"`
      return `${merged},${name} = ${value}`
    }, '')
    .substring(1)
}
