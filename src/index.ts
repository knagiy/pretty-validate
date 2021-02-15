/* eslint-disable  no-param-reassign */
import validator from './validator';
import { DetailedError } from './utils/detailed-error';

export default function validate(target: any, validations: any, options: any = {}): boolean {
  const errors: string[] = [];

  function processError(err: any): void {
    const message = err instanceof Error ? err.message : err;
    errors.push(`Validation error: ${message}`);
  }

  const targetKeys = Object.keys(target);
  const validatableKeys: any[] = targetKeys.filter((key) => validations.hasOwnProperty(key));
  const nonValidatableKeys: any[] = targetKeys.filter((key) => !validations.hasOwnProperty(key));

  if (options.strict) {
    if (nonValidatableKeys.length > 0) {
      throw new DetailedError('Extra parameters are not permitted.', {
        extraField: nonValidatableKeys,
      });
    }
  } else if (options.discardExtraProps) {
    for (const key of targetKeys) {
      if (validatableKeys.indexOf(key) < 0) {
        delete target[key];
      }
    }
  }

  for (const fieldName of Object.keys(validations)) {
    const validationRule = validations[fieldName];

    if ([null, undefined, ''].includes(target[fieldName])) {
      if (validationRule.required) {
        processError(validationRule.errorMessage || `Missing required parameter \`${fieldName}\``);
      } else if (validationRule.default) {
        target[fieldName] = validationRule.default;
      }
    } else {
      for (const validationName in validationRule) {
        if (['errorMessage', 'default'].indexOf(validationName) >= 0) continue;

        const args = [target[fieldName], validationRule[validationName]];
        // we should not pass true a parameter to validator methods
        if (args[1] === true) args.pop();

        if (validator.sanitizers[validationName]) {
          const sanitizedVal = validations.sanitizers[validationName](...args);

          if (sanitizedVal instanceof Error) {
            processError(sanitizedVal);
          } else {
            target[fieldName] = sanitizedVal;
          }
        } else if (validator.validators[validationName]) {
          const result = validator.validators[validationName](...args);

          if (result === false) {
            args.shift();
            processError(
              validationRule.errorMessage || `${fieldName} failed validation = ${validationName}(${args.join(',')})`,
            );
            break;
          } else if (result instanceof Error) {
            processError(result);
            break;
          }
        } else {
          // invalid validation rule is passed to validator
          throw new Error(`Invalid validation rule encountered: ${validationName}`);
        }
      }
    }
  }

  if (errors.length > 0) {
    throw new DetailedError('Some of the fields did not pass validation.', errors);
  }

  return true;
}
