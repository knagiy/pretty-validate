import Validator from '../src';
import isArray from '../src/lib/isArray';

const validator = new Validator();

describe('Validations Tests', () => {
  describe('isISO8601()', () => {
    it('should validate valid isISO8601', () => {
      const object: any = { date: '2007-04-05T24:00' };
      const result = validator.validate(object, {
        date: { isISO8601: true },
      });
      expect(result).toBe(true);
    });

    it('should fail for invalid date', () => {
      const object: any = { date: '2007-04-05, 24:00' };
      expect(() => {
        validator.validate(object, {
          date: { isISO8601: true },
        });
      }).toThrow();
    });
  });

  describe('isInt', () => {
    it('should validate 136', () => {
      const object: any = { int: 136 };
      const result = validator.validate(object, {
        int: { isInt: true },
      });
      expect(result).toBe(true);
    });

    it('should not validate 136.6', () => {
      const object: any = { int: 136.6 };

      expect(() => {
        validator.validate(object, {
          int: { isInt: true },
        });
      }).toThrow();
    });

    it('should not if below min', () => {
      const object: any = { int: 136 };

      expect(() => {
        validator.validate(object, {
          int: { isInt: { min: 150 } },
        });
      }).toThrow();
    });

    it('should validate if above min', () => {
      const object: any = { int: 136 };
      const result = validator.validate(object, {
        int: { isInt: { min: 130 } },
      });
      expect(result).toBe(true);
    });

    it('should not if above max', () => {
      const object: any = { int: 136 };

      expect(() => {
        validator.validate(object, {
          int: { isInt: { max: 110 } },
        });
      }).toThrow();
    });

    it('should validate if below max', () => {
      const object: any = { int: 136 };
      const result = validator.validate(object, {
        int: { isInt: { max: 150 } },
      });

      expect(result).toBe(true);
    });

    it('should not validate lt', () => {
      const object: any = { int: 136 };

      expect(() => {
        validator.validate(object, {
          int: { isInt: { lt: 110 } },
        });
      }).toThrow();
    });

    it('should validate lt', () => {
      const object: any = { int: 136 };
      const result = validator.validate(object, {
        int: { isInt: { lt: 150 } },
      });
      expect(result).toBe(true);
    });

    it('should not validate gt', () => {
      const object: any = { int: 136 };

      expect(() => {
        validator.validate(object, {
          int: { isInt: { gt: 150 } },
        });
      }).toThrow();
    });

    it('should validate gt', () => {
      const object: any = { int: 136 };
      const result = validator.validate(object, {
        int: { isInt: { gt: 130 } },
      });
      expect(result).toBe(true);
    });

    it('should not validate isInt, gt & max', () => {
      const object: any = { int: 1360 };

      expect(() => {
        validator.validate(object, {
          int: { isInt: { gt: 150, max: 1000 } },
        });
      }).toThrow();
    });

    it('should not validate isInt, gt & max for non Int', () => {
      const object: any = { int: 980.2 };

      expect(() => {
        validator.validate(object, {
          int: { isInt: { gt: 150, max: 1000 } },
        });
      }).toThrow();
    });

    it('should validate isInt, gt & max', () => {
      const object: any = { int: 980 };
      const result = validator.validate(object, {
        int: { isInt: { gt: 150, max: 1000 } },
      });
      expect(result).toBe(true);
    });
  });

  describe('isArray', () => {
    it('Should validate valid array', () => {
      const array = ['a', 'b', 'c'];
      const result = validator.validate(
        { array },
        {
          array: { isArray: true },
        },
      );
      expect(result).toBe(true);
    });
    it('Should not validate invalid array', () => {
      const array = "['a', 'b', 'c']";
      expect(() => {
        validator.validate(
          { array },
          {
            array: { isArray: true },
          },
        );
      }).toThrow();
    });
  });

  describe('isArrayOfEnums', () => {
    enum Fruits {
      apple = 'apple',
      orange = 'orange',
      banana = 'banana',
    }
    it('Should validate good value', () => {
      const list = [Fruits.apple, Fruits.orange];
      const result = validator.validate(
        { list },
        {
          list: { isArrayOfEnums: Fruits },
        },
      );
      expect(result).toBe(true);
    });
    it('Should not validate invalid array', () => {
      const list = ['tomato'];
      expect(() => {
        validator.validate(
          { list },
          {
            list: { isArrayOfEnums: Fruits },
          },
        );
      }).toThrow();
    });
  });

  describe('isArrayOfStrings', () => {
    it('Should validate good array', () => {
      const array = ['apple', 'orange'];
      const result = validator.validate(
        {
          array,
        },
        {
          array: { isArrayOfStrings: true },
        },
      );
      expect(result).toBe(true);
    });
    it('Should not validate invalid array', () => {
      const list = [1, 2];
      expect(() => {
        validator.validate(
          { list },
          {
            list: { isArrayOfStrings: true },
          },
        );
      }).toThrow();
    });
  });
  describe('isArrayOfUUIDs', () => {
    it('Should validate good array', () => {
      const array = ['60A8C2DC-1A95-46A6-8F4B-21A73FF9BBD4', '64756025-5244-4c20-b5b3-471996e4e144'];
      const result = validator.validate(
        {
          array,
        },
        {
          array: { isArrayOfUUIDs: true },
        },
      );
      expect(result).toBe(true);
    });
    it('Should not validate invalid array', () => {
      const array = ['60A8C2DC1A95A1A73FF9BBD4'];
      expect(() => {
        validator.validate(
          { array },
          {
            array: { isArrayOfUUIDs: true },
          },
        );
      }).toThrow();
    });
    it('Should not validate non array', () => {
      const array = 'E64936D6-8B6B-4972-86E6-9DBB3A4A3470';
      expect(() => {
        validator.validate(
          { array },
          {
            array: { isArrayOfUUIDs: true },
          },
        );
      }).toThrow();
    });
  });

  describe('maxLength', () => {
    it('Should validate valid value', () => {
      const value = '1234567890';
      const result = validator.validate(
        { value },
        {
          value: {
            maxLength: 11,
          },
        },
      );
      expect(result).toBe(true);
    });
    it('Should throw an error for longer value', () => {
      const value = '1234567890';
      expect(() => {
        validator.validate(
          { value },
          {
            value: {
              maxLength: 9,
            },
          },
        );
      }).toThrow();
    });
  });
});

describe('Sanitizer Tests', () => {
  describe('toArray', () => {
    it('Should sanitize to array', () => {
      const object = {
        value: 'E64936D6-8B6B-4972-86E6-9DBB3A4A3470',
      };
      validator.validate(object, {
        value: { toArray: true },
      });

      expect(isArray(object.value)).toBe(true);
      expect(object.value[0]).toEqual('E64936D6-8B6B-4972-86E6-9DBB3A4A3470');
    });
    it('Should leave value unchanged', () => {
      const object = {
        value: ['E64936D6-8B6B-4972-86E6-9DBB3A4A3470'],
      };
      validator.validate(object, {
        value: { toArray: true },
      });

      expect(object.value[0]).toEqual('E64936D6-8B6B-4972-86E6-9DBB3A4A3470');
    });
  });
  describe('toPrefixedUrl', () => {
    it('Should append HTTPS', () => {
      const object = {
        url: 'google.com',
      };
      validator.validate(object, {
        url: { toPrefixedUrl: true },
      });
      expect(object.url).toEqual('https://google.com');
    });
    it('Should not append HTTPS', () => {
      const object = {
        url: 'http://google.com',
      };
      validator.validate(object, {
        url: { toPrefixedUrl: true },
      });
      expect(object.url).toEqual('http://google.com');
    });
  });
});

describe('Custom validations', () => {
  describe('Overriding Existing Rules', () => {
    it('should override isISO8601 rule', () => {
      const customValidate = (value: string) => /\d{4}-\d{2}-\d{2}D\d\d:\d\d:\d\d/.test(value);
      const validator = new Validator({
        customValidators: {
          isISO8601: customValidate,
        },
      });

      let object: any = { date: '2002-10-10D12:48:10' };
      const result = validator.validate(object, {
        date: { isISO8601: true },
      });
      expect(result).toBe(true);

      object = { date: '2007-04-05, 24:00' };
      expect(() => {
        validator.validate(object, {
          date: { isISO8601: true },
        });
      }).toThrow();
    });
  });

  describe('Adding new rules', () => {
    it('should add a new rule', () => {
      const customValidate = (value: string) => ['testing', 'is', 'fun'].indexOf(value) >= 0;
      const validator = new Validator({
        customValidators: {
          isFun: customValidate,
        },
      });

      let object: any = { param: 'fun' };
      const result = validator.validate(object, {
        param: { isFun: true },
      });
      expect(result).toBe(true);

      object = { param: 45 };
      expect(() => {
        validator.validate(object, {
          param: { isFun: true },
        });
      }).toThrow();
    });
  });
});
