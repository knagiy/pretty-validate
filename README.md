# pretty-validate

A lightweight and minimalistic library designed for serverside validations. This library uses some of the validation rules from [validator.js](https://github.com/validatorjs/validator.js) with some key differences:

The following validation rules do not assert to receive a string value before the validation:

Rules                                  | Description
-------------------------------------- | -------------------------------
`isBoolean`                            | only raw boolean values: `true` and `false` values are considered valid. Thus, `"true"` or `0` will not be considered as a valid value;
`isInt`                                | only integer value types are considered valid (validated with `Number.isInteger(value)` method).
`isNumber`                             | only numeric values are considered valid. For instance, `3.14` is valid value, while `'3.14'`,`false`, `'a'`, `{}` are all invalid.

Other useful rules:

Rules                                  | Description
-------------------------------------- | -------------------------------
`isString`                             | Checks whether a passed value is an instance of string type. 
`isEnum`                               | Specify valid enum values for a parameter.
`required`                             | Checks whether a required value is not `null`, `undefined` or `''`.
`toUpperCase`                          | Converts the passed string to upper cased.
`toLowerCase`                          | Converts the passed string to lower cased.

## Installation and Usage
Install the library with `npm install pretty-validate`

### Usage
Validator Class comes with the `validate` methods and the list of the validation rules and sanitizers. For the full list of the rules, please see the [validator.js](https://github.com/validatorjs/validator.js) library documentation.

##### validate() options
- `strict`: **optional** boolean; if true, extra properties in validated object will result in error.
- `discardExtraProps`: **options** boolean; if true, extra properties will be deleted from the validated object.

```javascript
import Validator from "pretty-validate";

const validator = new Validator();

try {
    validator.validate(
        ctx.request.body,
        {
            email: {
                required: true,
                isEmail: true
            },
            password: {
                required: true,
                isStrongPassword: true
            },
            firstName: {
                isString: true
            },
            lastName: {
                isString: true,
                toUpperCase: true
            },
            age: { 
                required: true, 
                isInt: { min: 0, max: 99 }
            }           
        },
        {
            strict: true
        }            
    );
} catch (error) {
    // handle error here
}
```

#### Koa Example:
An easiest and elegant way to use this library is to define your own wrapper. In this wrapper you can define custom validation rules and handle validation errors.

Wrapper example - `my-validation.js`:
```javascript
import Validator from 'pretty-validate';

const customSanitizers = {
    toFooBared: (value) => { 
        return `${value}+fooBar`;
    }
};

const customValidators = {
    isFooBared: (value) => {
        return value.includes('fooBar');
    }
};

const validator = new Validator({
    customSanitizers,
    customValidators
});

export function validate(target, validations, options) {
  try {
    validator.validate(target, validations, options);
  } catch (error) {
    const { message, details } = error;
    
    // Handle your error here.
    // You can throw another error here to let your error handling middleware handle this
  }

  return true;
}
```  

In your Routes, you would use your wrapper function.

```javascript
import * as Router from "@koa/router";
import { validate } from './my-validation';

export const router = new Router({});

router.post("/signin", async ctx => {
    validate(ctx.request.body, {
        username: { required: true, isString: true },
        password: { required: true, isString: true }
    });
    // Validation is done. If something is not right, validate method will throw an error. 
    // Your error handling middleware should handle the error and return 400 error with an error message.
});
```

## License (MIT)

```
Copyright (c) 2021 Kamran Naghiyev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```