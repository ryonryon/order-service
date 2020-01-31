const mockGetInventories = jest.fn(() => [
  {
    inventory_id: 1,
    name: "product 1",
    description: "product description 1",
    price: 1,
    quantity_available: 1
  },
  {
    inventory_id: 2,
    name: "product 2",
    description: "product description 2",
    price: 4,
    quantity_available: 20
  },
  {
    inventory_id: 3,
    name: "product 3",
    description: "product description 3",
    price: 9,
    quantity_available: 30
  }
]);

jest.mock("../../src/db/InventoryTable", () => ({
  default: class {
    static getInventories() {
      mockGetInventories();
    }
  }
}));

function getInventoriesTest() {
  describe("Get all inventory items", () => {
    test("#1", async () => {
      expect.assertions(4);
      const res = await request(app).get("/inventories");
      expect(res.status).toBe(200);
      expect(res.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(res).toBe(0);

      expect(mockGetInventories()).toEqual([
        {
          inventory_id: 1,
          name: "product 1",
          description: "product description 1",
          price: 1,
          quantity_available: 1
        },
        {
          inventory_id: 2,
          name: "product 2",
          description: "product description 2",
          price: 4,
          quantity_available: 20
        },
        {
          inventory_id: 3,
          name: "product 3",
          description: "product description 3",
          price: 9,
          quantity_available: 30
        }
      ]);
    });
  });
}

export default getInventoriesTest;
