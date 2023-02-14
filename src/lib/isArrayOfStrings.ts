export default function isArrayOfStrings(values: any): boolean {
  if (!Array.isArray(values)) {
    return false;
  }
  for (const value of values) {
    if (typeof value !== 'string') {
      return false;
    }
  }
  return true;
}
