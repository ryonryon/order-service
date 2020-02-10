export const makeSyntaxAndParams = (id: number, items: [string, string | number | null][]): [string, any[]] => {
  let syntax = "";
  const params: any[] = [];
  for (const item of items) {
    const [key, value] = item;
    if (value === null) continue;
    syntax += `,${key} = ?`;
    params.push(value);
  }
  params.push(id);
  return [syntax.substring(1), params];
};
