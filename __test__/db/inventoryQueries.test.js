import {
  createInvntoryTable,
  insertInventoryItem,
  selectInventoryItems,
  selectInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryItemAvarability
} from "../../src/db/invnetoryQueries";

function inventoryQueriesTest() {
  describe("inventoryQueries", () => {
    test("createInvntoryTable", () => {
      expect(createInvntoryTable()).toBe(
        "CREATE TABLE IF NOT EXISTS inventory (inventory_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price INTEGER, quantity_available INTEGER)"
      );
    });

    test("insertInventoryItem", () => {
      expect(
        insertInventoryItem("product 1", "product description 1", 1, 1)
      ).toBe(
        `INSERT INTO inventory (name, description, price, quantity_available) VALUES ("product 1", "product description 1", 1, 1)`
      );
    });

    test("selectInventoryItems", () => {
      expect(selectInventoryItems()).toBe("SELECT * FROM inventory");
    });

    test("selectInventoryItem", () => {
      expect(selectInventoryItem(1)).toBe(
        "SELECT * FROM inventory WHERE inventory_id = 1"
      );
    });

    test("updateInventoryItem", () => {
      expect(
        updateInventoryItem(1, "product 1", "product description 1", 1, 1)
      ).toBe(
        `UPDATE inventory SET name = "product 1",description = "product description 1",price = 1,quantity_available = 1 WHERE inventory_id = 1`
      );
    });

    test("deleteInventoryItem", () => {
      expect(deleteInventoryItem(1)).toBe(
        "DELETE FROM inventory WHERE inventory_id = 1"
      );
    });

    test("getInventoryItemAvarability", () => {
      expect(getInventoryItemAvarability("product 1", 1)).toBe(
        `SELECT count(*) FROM inventory WHERE name = "product 1" AND 1 <= quantity_available`
      );
    });
  });
}

export default inventoryQueriesTest;
