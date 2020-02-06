export const makeUpdateItemSyntax = (items: [string, string | number | null][]): string => {
  return items
    .filter(item => {
      const [_, value] = item;
      return value !== null;
    })
    .reduce((merged, nonNullItem) => {
      const [name, value] = nonNullItem;
      if (typeof value === "string") return `${merged},${name} = "${value}"`;
      return `${merged},${name} = ${value}`;
    }, "")
    .substring(1);
};
