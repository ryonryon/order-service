import inventoryTest from "./inventory/inventory.test";
import { server } from "../src/index";

describe("Simple Order Service test", () => {
  afterAll(() => server.close());
  describe("inventory route", inventoryTest);
});
