import { Validator } from "../src";

describe('Validations Tests', () => {
  const validator = new Validator();

  describe('isISO8601()', () => {
    it('should validate valid isISO8601', () => {
        const object: any = { date: '2007-04-05T24:00'};
        const result = validator.validate(object, {
            date: { isISO8601: true }
        });
        expect(result).toBe(true);
    });

    it('should fail for invalid date', () => {
      const object: any = { date: '2007-04-05, 24:00'};
      expect(() => {
        validator.validate(object, {
          date: { isISO8601: true }
        })
      }).toThrow();
    });
  });
});

describe('Custom validations', () => {
  describe('Overriding Existing Rules', () => {
    it('should override isISO8601 rule', ()=> {
      const customValidate = (value: string) => {
        return /\d{4}-\d{2}-\d{2}D\d\d:\d\d:\d\d/.test(value);
      };
      const validator = new Validator({
        customValidators: {
          isISO8601: customValidate
        }
      });

      let object: any = { date: '2002-10-10D12:48:10' };
      const result = validator.validate(object, {
        date: { isISO8601: true }
      });
      expect(result).toBe(true);

      object = { date: '2007-04-05, 24:00'};
      expect(() => {
        validator.validate(object, {
          date: { isISO8601: true }
        })
      }).toThrow();
    });
  });

  describe('Adding new rules', () => {
    it('should add a new rule', () => {
      const customValidate = (value: string) => {
        return ['testing', 'is', 'fun'].indexOf(value) >= 0;
      };
      const validator = new Validator({
        customValidators: {
          isFun: customValidate
        }
      });

      let object: any = { param: 'fun' };
      const result = validator.validate(object, {
        param: { isFun: true }
      });
      expect(result).toBe(true);

      object = { param: 45 };
      expect(() => {
        validator.validate(object, {
          param: { isFun: true }
        })
      }).toThrow();
    });
  });
});