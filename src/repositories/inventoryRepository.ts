import dBSqlite3 from "../db/dbSqlite3";

import {
  selectInventoryItems,
  insertInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
  selectInventoryItem,
  createInvntoryTable
} from "../db/invnetoryQueries";
import { RunResult } from "sqlite3";

class InventoryTable {
  static createInventory(name: String, description: String, price: String, quantityAvailable: String): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(createInvntoryTable(), (err: Error | null) => {
          if (err) return reject(err);
        });
        db.run(insertInventoryItem(name, description, price, quantityAvailable), (err: Error | null) => {
          if (err) return reject(err);
          return resolve();
        });
      });
    });
  }

  static getInventories(): Promise<any[] | null> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectInventoryItems(), (err: Error | null, rows: any[]) => {
        return err ? reject(err) : resolve(rows);
      })
    );
  }

  static getInventory(id: Number): Promise<any | null> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.get(selectInventoryItem(id), (err: Error | null, row: any) => (err ? reject(err) : resolve(row)))
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
