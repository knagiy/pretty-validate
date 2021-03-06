export default function isNumber(value: any, options: any = {}) {
  if (
    value === null ||
    Number.isNaN(value) ||
    ['string', 'object', 'boolean', 'undefined'].indexOf(typeof value) >= 0
  ) {
    return false;
  }

  // Check min/max/lt/gt
  const minCheckPassed = !options.hasOwnProperty('min') || value >= options.min;
  const maxCheckPassed = !options.hasOwnProperty('max') || value <= options.max;
  const ltCheckPassed = !options.hasOwnProperty('lt') || value < options.lt;
  const gtCheckPassed = !options.hasOwnProperty('gt') || value > options.gt;

  return minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}
