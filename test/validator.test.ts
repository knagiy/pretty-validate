import validate from "../src";

describe('Validate Method', () => {
  describe("Validation Rules", () => {
    it("default value", () => {
      const object: any = {};
      const result = validate(object, {
        param: { default: "default value" }
      });
      expect(object.param).toEqual("default value");
      expect(result).toBe(true);
    });

    it("discard extra parameters", () => {
      const object: any = { param: "admin", extra: "extra" };
      const result = validate(object, {
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
        validate(object,
          { param: { required: true } },
        { strict: true }
        );
      }).toThrow("Extra parameters are not permitted");
    });

    it("required()", () => {
      const object = { param: "admin" };
      expect(() => {
        validate(object, {
          password: { required: true },
        });
      }).toThrow(errorMessage);
    });

    it("required() empty string", () => {
      const object = { param: "" };
      expect(() => {
        validate(object, {
          param: { required: true },
        });
      }).toThrow(errorMessage);
    });
  });

  describe("Passing validation Rules", () => {
    const errorMessage = "Some of the fields did not pass validation";

    it("strict mode - no extra params allowed", () => {
      const object = { param: "admin" };
      const result = validate(object,
        { param: { required: true } },
        { strict: true }
      );
      expect(result).toBe(true);
    });

    it("required()", () => {
      const object = { param: "admin" };
      const result = validate(object, {
        param: { required: true },
      });
      expect(result).toBe(true);
    });
  });
});