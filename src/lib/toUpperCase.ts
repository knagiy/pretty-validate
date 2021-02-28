import assertString from '../utils/assert-string';

export default function toUpperCase(value: string): string {
  assertString(value);

  return value.toUpperCase();
}
