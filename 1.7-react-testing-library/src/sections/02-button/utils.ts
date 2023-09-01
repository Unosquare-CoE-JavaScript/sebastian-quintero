export function replaceCamelWithSpaces(colorName: string) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}
