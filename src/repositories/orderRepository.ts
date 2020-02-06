import dBSqlite3 from "../db/dbSqlite3";

import {
  createOrderTable,
  selectOrders,
  selectOrder,
  insertOrder,
  updateOrderItem,
  deleteOrder
} from "../db/orderQueries";
import { RunResult } from "sqlite3";

class OrderTable {
  static createOrder(
    customerEmailAddress: String,
    dateOrderPlaced: String,
    orderStatus: String
  ) {
    const db = dBSqlite3();
    db.serialize(() => {
      db.run(createOrderTable());
      db.run(insertOrder(customerEmailAddress, dateOrderPlaced, orderStatus));
    });
  }

  static getOrders(): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectOrders(), (err, rows) => (err ? reject(err) : resolve(rows)))
    );
  }

  static getOrder(id: Number): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.get(selectOrder(id), (err, row) => (err ? reject(err) : resolve(row)))
    );
  }

  static updateOrder(
    id: Number,
    customerEmailAddres: String | null = null,
    dateOrderPlaced: String | null = null,
    orderStatus: String | null = null
  ): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.run(
        updateOrderItem(id, customerEmailAddres, dateOrderPlaced, orderStatus),
        (err: Error | null, _: RunResult) => (err ? reject(err) : resolve())
      );
    });
  }

  static deleteOrder(id: Number): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(deleteOrder(id), (err: Error | null, _: RunResult) =>
        err ? reject(err) : resolve()
      )
    );
  }
}

export default OrderTable;
