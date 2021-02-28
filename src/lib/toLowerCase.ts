import assertString from '../utils/assert-string';

export default function toLowerCase(value: string): string {
  assertString(value);

  return value.toLowerCase();
}
