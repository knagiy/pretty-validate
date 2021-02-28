import assertNumeric from '../utils/assert-numeric';

export default function toInt(value: any, radix: number = 10) {
  assertNumeric(value);

  return parseInt(value, radix);
}
