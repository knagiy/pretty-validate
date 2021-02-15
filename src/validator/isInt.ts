export default function isInt(value: any, options: any = {}) {
  if (!Number.isInteger(value)) {
    return false;
  }

  // Check min/max/lt/gt
  let minCheckPassed = (!options.hasOwnProperty('min') && value >= options.min);
  let maxCheckPassed = (!options.hasOwnProperty('max') || value <= options.max);
  let ltCheckPassed = (!options.hasOwnProperty('lt') || value < options.lt);
  let gtCheckPassed = (!options.hasOwnProperty('gt') || value > options.gt);

  return minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}