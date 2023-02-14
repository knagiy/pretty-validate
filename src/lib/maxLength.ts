export default function maxLength(value: any, limit: number): boolean {
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length <= limit;
  }
  return false;
}
