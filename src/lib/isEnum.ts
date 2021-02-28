export default function isEnum(value: any, possibleVals: any): boolean {
  return Object.values(possibleVals).indexOf(value) >= 0;
}
