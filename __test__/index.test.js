import inventoryTest from "./inventory/inventory.test";
import dbTest from "./db/db.test";

describe("Simple Order Service test", () => {
  describe("inventory route", inventoryTest);
  describe("db", dbTest);
});
