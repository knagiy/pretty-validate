import assertNumeric from '../utils/assert-numeric';

export default function toFloat(value: any) {
  try {
    assertNumeric(value);
  } catch (error) {
    return error;
  }

  return parseFloat(value);
}
