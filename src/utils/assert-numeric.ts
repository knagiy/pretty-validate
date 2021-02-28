export default function assertNumeric(value: any) {
  if (value === null || Number.isNaN(value) || ['object', 'boolean', 'undefined'].indexOf(typeof value) >= 0) {
    throw new TypeError(`Expected a numeric value but received a ${value}`);
  }
}
