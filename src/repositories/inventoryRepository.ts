import { RunResult } from "sqlite3";

import dBSqlite3 from "../db/dbSqlite3";
import {
  qSelectInventoryItems,
  qInsertInventoryItem,
  qDeleteInventoryItem,
  qUpdateInventoryItem,
  qSelectInventoryItem,
  qCreateInvntoryTable
} from "../db/invnetoryQueries";
import { INVALID_INVENTORY_ID_ERROR } from "../constants";

class InventoryTable {
  static createInventory(name: String, description: String, price: String, quantityAvailable: String): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(qCreateInvntoryTable(), (_: RunResult, err: Error | null) => {
          if (err) return reject(err);
        });
        db.run(qInsertInventoryItem(name, description, price, quantityAvailable), (_: RunResult, err: Error | null) =>
          err ? reject(err) : resolve()
        );
      });
    });
  }

  static getInventories(): Promise<any[]> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(qSelectInventoryItems(), (err: Error | null, rows: any[]) => (err ? reject(err) : resolve(rows)))
    );
  }

  static getInventory(id: number): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.get(qSelectInventoryItem, [id], (err: Error | null, row: any) => (err ? reject(err) : resolve(row)))
    );
  }

  static async updateInventory(
    id: number,
    name: string | null,
    description: string | null,
    price: number | null,
    quantityAvailable: number | null
  ): Promise<void> {
    const db = dBSqlite3();
    const inventory = await this.getInventory(id);
    if (inventory === null) throw INVALID_INVENTORY_ID_ERROR.type;

    return new Promise((resolve, reject) =>
      db.run(qUpdateInventoryItem(id, name, description, price, quantityAvailable), (_: RunResult, err: Error | null) =>
        err ? reject(err) : resolve()
      )
    );
  }

  static async deleteInventry(id: number): Promise<void> {
    const db = dBSqlite3();
    const inventory = await this.getInventory(id);
    if (inventory === null) throw INVALID_INVENTORY_ID_ERROR.type;

    return new Promise((resolve, reject) =>
      db.run(qDeleteInventoryItem, [id], (_: RunResult, err: Error | null) => (err ? reject(err) : resolve()))
    );
  }
}

export default InventoryTable;
