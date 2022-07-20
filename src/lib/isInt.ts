export default function isInt(value: any, options: any = {}) {
  if (!Number.isInteger(value)) {
    return false;
  }

  // Check min/max/lt/gt
  const minCheckPassed = !Object.prototype.hasOwnProperty.call(options, 'min') || value >= options.min;
  const maxCheckPassed = !Object.prototype.hasOwnProperty.call(options, 'max') || value <= options.max;
  const ltCheckPassed = !Object.prototype.hasOwnProperty.call(options, 'lt') || value < options.lt;
  const gtCheckPassed = !Object.prototype.hasOwnProperty.call(options, 'gt') || value > options.gt;

  return minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}
