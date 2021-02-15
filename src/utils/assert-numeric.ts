export default function assertNumeric(input: any) {
  if (Number.isNaN(input)) {
    throw new TypeError(`Expected a numeric value but received a ${input}`);
  }
}
