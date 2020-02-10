import { RunResult } from "sqlite3";

import dBSqlite3 from "../db/dbSqlite3";
import {
  q_selectInventoryItems,
  insertInventoryItem,
  q_deleteInventoryItem,
  q_updateInventoryItem,
  q_selectInventoryItem,
  q_createInvntoryTable
} from "../db/invnetoryQueries";
import { INVALID_INVENTORY_ID_ERROR } from "../constants";

class InventoryTable {
  static createInventory(name: String, description: String, price: String, quantityAvailable: String): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(q_createInvntoryTable(), (_: RunResult, err: Error | null) => {
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
      db.all(q_selectInventoryItems(), (err: Error | null, rows: any[]) => (err ? reject(err) : resolve(rows)))
    );
  }

  static getInventory(id: number): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.get(q_selectInventoryItem(id), (err: Error | null, row: any) => (err ? reject(err) : resolve(row)))
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
    if (!this.isInventoryExist(id)) throw INVALID_INVENTORY_ID_ERROR.type;

    new Promise((resolve, reject) =>
      db.run(
        q_updateInventoryItem(id, name, description, price, quantityAvailable),
        (_: RunResult, err: Error | null) => (err ? reject(err) : resolve())
      )
    );
  }

  static async deleteInventry(id: number): Promise<void> {
    const db = dBSqlite3();
    if (!this.isInventoryExist(id)) throw INVALID_INVENTORY_ID_ERROR.type;

    new Promise((resolve, reject) =>
      db.run(q_deleteInventoryItem(id), (_: RunResult, err: Error | null) => (err ? reject(err) : resolve()))
    );
  }

  private static async isInventoryExist(id: number): Promise<boolean> {
    const db = dBSqlite3();
    const inventory = await new Promise<any>((resolve, reject) =>
      db.get(q_selectInventoryItem(id), (err: Error | null, _inventory: any) =>
        err ? reject(err) : resolve(_inventory)
      )
    );
    return inventory !== undefined;
  }
}

export default InventoryTable;
