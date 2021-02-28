import { Validator } from "../src";

describe('Validate Method', () => {
  const validator = new Validator();

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
});