import DBSqlite3 from "./dbSqlite3";

import {
  createInvntoryTable,
  selectInventoryItems,
  insertInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
  selectInventoryItem
} from "./invnetoryQueries";

class InventoryTable {
  static async createInventory(name, description, price, quantity_available) {
    const db = new DBSqlite3();
    await db.serialize(async () => {
      await db.run(createInvntoryTable());
      await db.run(
        insertInventoryItem(name, description, price, quantity_available)
      );
    });
  }

  static getInventories() {
    const db = new DBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectInventoryItems(), (err, rows) =>
        err ? reject(err) : resolve(rows)
      )
    );
  }

  static getInventory(id) {
    const db = new DBSqlite3();
    return new Promise((resolve, reject) =>
      db.get(selectInventoryItem(id), (err, row) =>
        err ? reject(err) : resolve(row)
      )
    );
  }

  static deleteInventry(id) {
    const db = new DBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(deleteInventoryItem(id), (err, _) =>
        err ? reject(err) : resolve()
      )
    );
  }

  static async updateInventory(
    id,
    name = null,
    description = null,
    price = null,
    quantity_available = null
  ) {
    const db = new DBSqlite3();
    return await db.serialize(async () => {
      console.log(
        updateInventoryItem(id, name, description, price, quantity_available)
      );
      await db.run(
        updateInventoryItem(id, name, description, price, quantity_available)
      );
    });
  }
}

export default InventoryTable;
