/* eslint-disable  no-param-reassign */
import lib from './lib';
import DetailedError from './utils/detailed-error';
import { ConstructorOptions } from './@types/constructorOptions.types';

export default class Validator {
  protected sanitizers: any;

  protected validators: any;

  constructor(options: ConstructorOptions = {}) {
    this.sanitizers = {
      ...lib.sanitizers,
      ...options.customSanitizers,
    };

    this.validators = {
      ...lib.validators,
      ...options.customValidators,
    };
  }

  public validate(target: any, validations: any, options: any = {}): boolean {
    const errors: { message: string; field: string }[] = [];

    function processError(err: any, field: string): void {
      const message = err instanceof Error ? err.message : err;
      errors.push({ message, field });
    }

    const targetKeys = Object.keys(target);
    const validatableKeys: any[] = targetKeys.filter((key) => Object.prototype.hasOwnProperty.call(validations, key));
    const nonValidatableKeys: any[] = targetKeys.filter(
      (key) => !Object.prototype.hasOwnProperty.call(validations, key),
    );

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
          processError(validationRule.errorMessage || 'Required value', fieldName);
        } else if (validationRule.default) {
          target[fieldName] = validationRule.default;
        }
      } else {
        const keys = Object.keys(validationRule);
        for (let i = 0; i < keys.length; i++) {
          const validationName = keys[i];
          if (['errorMessage', 'default'].indexOf(validationName) >= 0) continue;

          const args = [target[fieldName], validationRule[validationName]];
          // we should not pass true a parameter to validator methods
          if (args[1] === true) args.pop();

          if (this.sanitizers[validationName]) {
            let sanitizedVal;

            try {
              sanitizedVal = this.sanitizers[validationName](...args);
            } catch (error) {
              processError(error, fieldName);
              break;
            }

            if (sanitizedVal instanceof Error) {
              processError(sanitizedVal, fieldName);
              break;
            } else {
              target[fieldName] = sanitizedVal;
            }
          } else if (this.validators[validationName]) {
            let result;
            try {
              result = this.validators[validationName](...args);
            } catch (error) {
              processError(error, fieldName);
              break;
            }

            if (result === false) {
              args.shift();
              processError(validationRule.errorMessage || `Failed validation ${validationName}`, fieldName);
              break;
            } else if (result instanceof Error) {
              processError(result, fieldName);
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
}
