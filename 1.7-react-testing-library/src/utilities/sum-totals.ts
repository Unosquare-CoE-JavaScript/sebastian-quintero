export function sumTotals(price: number, options: Record<string, number>) {
  return price * Object.values(options).reduce((acc, x) => acc + x, 0);
}
