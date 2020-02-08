import { RunResult } from "sqlite3";

import dBSqlite3 from "../db/dbSqlite3";
import {
  selectInventoryItems,
  insertInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
  selectInventoryItem,
  createInvntoryTable
} from "../db/invnetoryQueries";

class InventoryTable {
  static createInventory(name: String, description: String, price: String, quantityAvailable: String): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(createInvntoryTable(), (_: RunResult, err: Error | null) => {
          if (err) return reject(err);
        });
        db.run(insertInventoryItem(name, description, price, quantityAvailable), (_: RunResult, err: Error | null) =>
          err ? reject(err) : resolve()
        );
      });
    });
  }

  static getInventories(): Promise<any[]> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectInventoryItems(), (err: Error | null, rows: any[]) => (err ? reject(err) : resolve(rows)))
    );
  }

  static getInventory(id: number): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.get(selectInventoryItem(id), (err: Error | null, row: any) => (err ? reject(err) : resolve(row)))
    );
  }

  static updateInventory(
    id: number,
    name: string | null,
    description: string | null,
    price: number | null,
    quantityAvailable: number | null
  ): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(updateInventoryItem(id, name, description, price, quantityAvailable), (_: RunResult, err: Error | null) =>
        err ? reject(err) : resolve()
      )
    );
  }

  static deleteInventry(id: number): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(deleteInventoryItem(id), (_: RunResult, err: Error | null) => (err ? reject(err) : resolve()))
    );
  }
}

export default InventoryTable;
