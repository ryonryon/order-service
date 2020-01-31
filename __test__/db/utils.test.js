import { makeUpdateItemSyntax } from "../../src/db/utils";

function utilsTest() {
  describe("utilsTest", () => {
    test("makeUpdateItemSyntax", () => {
      expect(
        makeUpdateItemSyntax([
          ["name", "name"],
          ["description", "description"],
          ["price", "price"],
          ["quantity_available", "quantity_available"]
        ])
      ).toBe(
        `name = "name",description = "description",price = "price",quantity_available = "quantity_available"`
      );
    });
  });
}

export default utilsTest;
