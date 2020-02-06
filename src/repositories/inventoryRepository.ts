import dBSqlite3 from "../db/dbSqlite3";
import Inventory from "../entities/inventory";

import {
  selectInventoryItems,
  insertInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
  updateInventoryItemQuantiy,
  selectInventoryItem,
  createInvntoryTable
} from "../db/invnetoryQueries";
import { RunResult } from "sqlite3";

class InventoryTable {
  static createInventory(name: String, description: String, price: String, quantityAvailable: String) {
    const db = dBSqlite3();
    db.serialize(() => {
      db.run(createInvntoryTable());
      db.run(insertInventoryItem(name, description, price, quantityAvailable));
    });
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
      db.get(selectInventoryItem(id), (err, row) => (err ? reject(err) : resolve(row)))
    );
  }

  static updateInventory(
    id: number,
    name: string | null = null,
    description: string | null = null,
    price: number | null = null,
    quantityAvailable: number | null = null
  ): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.run(updateInventoryItem(id, name, description, price, quantityAvailable), (_: RunResult, err: Error | null) =>
        err ? reject(err) : resolve()
      );
    });
  }

  static deleteInventry(id: Number): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(deleteInventoryItem(id), (_: RunResult, err: Error | null) => (err ? reject(err) : resolve()))
    );
  }
}

export default InventoryTable;
