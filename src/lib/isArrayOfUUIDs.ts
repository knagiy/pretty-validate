export default function isArrayOfUUIDs(values: any): boolean {
  if (!Array.isArray(values)) {
    return false;
  }
  const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  for (const value of values) {
    if (!value || typeof value !== 'string' || !regex.test(value)) {
      return false;
    }
  }
  return true;
}
