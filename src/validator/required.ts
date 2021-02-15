export default function required(value: any): boolean | Error {
  if (value === null || value === undefined || value === '') {
    return new Error('Missing parameter');
  }
  return true;
}
