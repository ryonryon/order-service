import dBSqlite3 from "../db/dbSqlite3";
import Inventory from "../entities/inventory";

import {
  selectInventoryItems,
  insertInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
  selectInventoryItem
} from "../db/invnetoryQueries";
import { RunResult } from "sqlite3";

class InventoryTable {
  static createInventory(
    name: String,
    description: String,
    price: String,
    quantityAvailable: String
  ): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(
        insertInventoryItem(name, description, price, quantityAvailable),
        (_: RunResult, err: Error | null) => (err ? reject(err) : resolve())
      )
    );
  }

  static getInventories(): Promise<Inventory[] | null> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectInventoryItems(), (err, rows) => {
        return err ? reject(err) : resolve(rows);
      })
    );
  }

  static getInventory(id: Number): Promise<Inventory | null> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.get(selectInventoryItem(id), (err, row) =>
        err ? reject(err) : resolve(row)
      )
    );
  }

  static updateInventory(
    id: Number,
    name: String | null = null,
    description: String | null = null,
    price: String | null = null,
    quantityAvailable: String | null = null
  ): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.run(
        updateInventoryItem(id, name, description, price, quantityAvailable),
        (_: RunResult, err: Error | null) => (err ? reject(err) : resolve())
      );
    });
  }

  static deleteInventry(id: Number): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(deleteInventoryItem(id), (_: RunResult, err: Error | null) =>
        err ? reject(err) : resolve()
      )
    );
  }
}

export default InventoryTable;
