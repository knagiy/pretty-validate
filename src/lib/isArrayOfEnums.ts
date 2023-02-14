export default function isArrayOfEnums(values: any, possibleVals: any): boolean {
  const allowedValues = Object.values(possibleVals);

  if (!Array.isArray(values)) {
    return false;
  }
  for (const value of values) {
    if (allowedValues.indexOf(value) < 0) {
      return false;
    }
  }
  return true;
}
