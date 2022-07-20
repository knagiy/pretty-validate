import Validator from '../src';

describe('Validations Tests', () => {
  const validator = new Validator();

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
