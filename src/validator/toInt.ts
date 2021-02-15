import assertNumeric from '../utils/assert-numeric';

export default function toInt(value: any, radix: number = 10) {
  try {
    assertNumeric(value);
  } catch (error) {
    return error;
  }

  return parseInt(value, radix);
}
