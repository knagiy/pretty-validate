import assertString from '../utils/assert-string';

export default function toDate(date: any) {
  try {
    assertString(date);
  } catch (error) {
    return error;
  }

  date = Date.parse(date);
  return !isNaN(date) ? new Date(date) : null;
}
