import Validator from "../src";

const validator = new Validator();

describe('Validate Method', () => {

  describe("Validation Rules", () => {
    it("default value", () => {
      const object: any = {};
      const result = validator.validate(object, {
        param: { default: "default value" }
      });
      expect(object.param).toEqual("default value");
      expect(result).toBe(true);
    });

    it("discard extra parameters", () => {
      const object: any = { param: "admin", extra: "extra" };
      const result = validator.validate(object, {
        param: { default: "default value" }
      },
        {
          discardExtraProps: true
        });
      expect(object.extra).toBeUndefined();
      expect(result).toBe(true);
    });
  });

  describe("Failing validation Rules", () => {
    const errorMessage = "Some of the fields did not pass validation";

    it("strict mode - no extra params allowed", () => {
      const object = { param: "admin", extra: "extra" };
      expect(() => {
        validator.validate(object,
          { param: { required: true } },
        { strict: true }
        );
      }).toThrow("Extra parameters are not permitted");
    });

    it("required()", () => {
      const object = { param: "admin" };
      expect(() => {
        validator.validate(object, {
          password: { required: true },
        });
      }).toThrow(errorMessage);
    });

    it("required() empty string", () => {
      const object = { param: "" };
      expect(() => {
        validator.validate(object, {
          param: { required: true },
        });
      }).toThrow(errorMessage);
    });
  });

  describe("Passing validation Rules", () => {
    it("strict mode - no extra params allowed", () => {
      const object = { param: "admin" };
      const result = validator.validate(object,
        { param: { required: true } },
        { strict: true }
      );
      expect(result).toBe(true);
    });

    it("required()", () => {
      const object = { param: "admin" };
      const result = validator.validate(object, {
        param: { required: true },
      });
      expect(result).toBe(true);
    });
  });

  describe("Validation Rules", () => {
    it("Should not throw error for valid object", () => {
      const object = {
        email: "test@test.com",
        password: "testingIsFun19*",
        type: "user"
      };
      const result = validator.validate(object, {
        email: { required: true, isEmail: true },
        password: { required: true, isStrongPassword: true },
        type: { isIn: ["user", "admin"]}
      });
      expect(result).toBe(true);
    });

    it("default value", () => {
      const object: any = {};
      const result = validator.validate(object, {
        param: { default: "default value" }
      });
      expect(object.param).toEqual("default value");
      expect(result).toBe(true);
    });

    it("discard extra parameters", () => {
      const object: any = { param: "admin", extra: "extra" };
      const result = validator.validate(object, {
          param: { default: "default value" }
        },
        {
          discardExtraProps: true
        });
      expect(object.extra).toBeUndefined();
      expect(result).toBe(true);
    });
  });

  describe("Failing validation Rules", () => {
    const errorMessage = "Some of the fields did not pass validation";

    it("strict mode - no extra params allowed", () => {
      const object = { param: "admin", extra: "extra" };
      expect(() => {
        validator.validate(object,
          { param: { required: true } },
          { strict: true }
        );
      }).toThrow("Extra parameters are not permitted");
    });

    it("required()", () => {
      const object = { param: "admin" };
      expect(() => {
        validator.validate(object, {
          password: { required: true },
        });
      }).toThrow(errorMessage);
    });

    it("required() empty string", () => {
      const object = { param: "" };
      expect(() => {
        validator.validate(object, {
          param: { required: true },
        });
      }).toThrow(errorMessage);
    });

    it("isBoolean()", () => {
      const object = { param: "maybe" };
      expect(() => {
        validator.validate(object, {
          param: { isBoolean: true },
        });
      }).toThrow(errorMessage);
    });

    it("isEmail()", () => {
      const object = { param: 45 };
      expect(() => {
        validator.validate(object, {
          param: { isEmail: true },
        });
      }).toThrow("Some of the fields did not pass validation.");
    });

    it("isFloat()", () => {
      const object = { param: "test" };
      expect(() => {
        validator.validate(object, {
          param: { isNumber: true },
        });
      }).toThrow(errorMessage);
    });

    it("isISO31661Alpha2()", () => {
      const object = { param: "XM" };
      expect(() => {
        validator.validate(object, {
          param: { isISO31661Alpha2: true },
        });
      }).toThrow(errorMessage);
    });

    it("isStrongPassword()", () => {
      const object = { param: "admin" };
      expect(() => {
        validator.validate(object, {
          param: { isStrongPassword: true },
        });
      }).toThrow(errorMessage);
    });
  });

  describe("Passing validation Rules", () => {
    it("required()", () => {
      const object = { param: "admin" };
      const result = validator.validate(object, {
        param: { required: true },
      });
      expect(result).toBe(true);
    });

    it("isBoolean()", () => {
      const object = { param: true };
      const result = validator.validate(object, {
        param: { isBoolean: true },
      });
      expect(result).toBe(true);
    });

    it("isEmail()", () => {
      const object = { param: "test@gmail.com" };
      const result = validator.validate(object, {
        param: { isEmail: true },
      });
      expect(result).toBe(true);
    });

    it("isNumber()", () => {
      const object = { param: 3.12 };
      const result = validator.validate(object, {
        param: { isNumber: true },
      });
      expect(result).toBe(true);
    });

    it("isISO31661Alpha2()", () => {
      const object = { param: "CA" };
      const result = validator.validate(object, {
        param: { isISO31661Alpha2: true },
      });
      expect(result).toBe(true);
    });

    it("isStrongPassword()", () => {
      const object = { param: "*sajjs77Jasbbd*12as" };
      const result = validator.validate(object, {
        param: { isStrongPassword: true },
      });
      expect(result).toBe(true);
    });
  });

  describe("Sanitizer Rules", () => {
    it("Should not throw error for valid object", () => {
      const object = {
        ltrim: " Left",
        normalizeEmail: "James@company.com",
        rtrim: "Right ",
        toBoolean: "true",
        toDate: "2021-10-20",
        toFloat: "3.14",
        toInt: "3",
        trim: " trim ",
      };
      const result = validator.validate(object, {
        ltrim: { ltrim: true },
        normalizeEmail: { normalizeEmail: { all_lowercase: true } },
        rtrim: { rtrim: true },
        toBoolean: { toBoolean: { strict: true } },
        toDate: { toDate: true },
        toFloat: { toFloat: true },
        toInt: { toInt: true },
        trim: { trim: true },
      });

      expect(result).toBe(true);
      expect(object).toMatchObject({
        ltrim: "Left",
        normalizeEmail: "james@company.com",
        rtrim: "Right",
        toBoolean: true,
        toDate: new Date("2021-10-20"),
        toFloat: 3.14,
        toInt: 3,
        trim: "trim"
      });
    });
  });
});