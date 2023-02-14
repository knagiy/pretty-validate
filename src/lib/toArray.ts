export default function toArray(value: string): any[] {
  return Array.isArray(value) ? value : [value];
}
