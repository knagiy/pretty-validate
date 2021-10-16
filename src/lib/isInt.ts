export default function isInt(value: any, options: any = {}) {
  if (!Number.isInteger(value)) {
    return false;
  }

  // Check min/max/lt/gt
  const minCheckPassed = !options.hasOwnProperty('min') || value >= options.min;
  const maxCheckPassed = !options.hasOwnProperty('max') || value <= options.max;
  const ltCheckPassed = !options.hasOwnProperty('lt') || value < options.lt;
  const gtCheckPassed = !options.hasOwnProperty('gt') || value > options.gt;

  return minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}
