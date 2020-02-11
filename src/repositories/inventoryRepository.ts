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
import { INVALID_INVENTORY_ID_ERROR } from "../constants/errors";
import Inventory from "../entities/inventory";

class InventoryTable {
  static createInventory(name: String, description: String, price: String, quantityAvailable: String): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(qCreateInvntoryTable, (_: RunResult, err: Error | null) => {
          if (err) return reject(err);
        });
        db.run(qInsertInventoryItem, [name, description, price, quantityAvailable], (_: RunResult, err: Error | null) =>
          err ? reject(err) : resolve()
        );
      });
    });
  }

  static getInventories(): Promise<Inventory[]> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(qSelectInventoryItems, (err: Error | null, rows: any[]) =>
        err
          ? reject(err)
          : resolve(
              rows.map(
                (row: any) =>
                  new Inventory(row.inventory_id, row.name, row.description, row.price, row.quantity_available)
              )
            )
      )
    );
  }

  static getInventory(id: number): Promise<Inventory | null> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.get(qSelectInventoryItem, [id], (err: Error | null, row: any) => {
        err
          ? reject(err)
          : row === null
          ? resolve(null)
          : resolve(new Inventory(row.inventory_id, row.name, row.description, row.price, row.quantity_available));
      })
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

    const [updateinventoryQuery, params] = qUpdateInventoryItem(id, name, description, price, quantityAvailable);

    return new Promise((resolve, reject) =>
      db.run(updateinventoryQuery, params, (_: RunResult, err: Error | null) => (err ? reject(err) : resolve()))
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
