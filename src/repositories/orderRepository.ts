import { RunResult } from "sqlite3";

import dBSqlite3 from "../db/dbSqlite3";
import { updateInventoryItemQuantiy } from "../db/invnetoryQueries";
import { insertOrderDetail, createOrderDetailTable } from "../db/orderDetailQueries";
import {
  createOrderTable,
  selectOrders,
  selectOrder,
  selectOrderNewest,
  insertOrder,
  updateOrderItem,
  deleteOrder
} from "../db/orderQueries";
import InventoryQuantity from "../entities/inventoryQuantity";

class OrderTable {
  static createOrder(
    customerEmailAddress: string,
    dateOrderPlaced: string,
    orderStatus: string,
    orderItems: InventoryQuantity[]
  ): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.serialize(async () => {
        db.run(createOrderTable());
        db.run(createOrderDetailTable());
        db.run(insertOrder(customerEmailAddress, dateOrderPlaced, orderStatus));
        db.get(selectOrderNewest(), (err, row) => {
          if (err) return reject(err);
          orderItems.forEach(orderItem => {
            db.run(updateInventoryItemQuantiy(orderItem.inventoryId, orderItem.newQuantityAvailable));
            db.run(insertOrderDetail(row["order_id"], orderItem.inventoryId, orderItem.quantity));

            return resolve();
          });
        });
      });
    });
  }

  static getOrders(): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectOrders(), (err, rows) => {
        return err ? reject(err) : resolve(rows);
      })
    );
  }

  static getOrder(id: Number): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => db.all(selectOrder(id), (err, row) => (err ? reject(err) : resolve(row))));
  }

  static updateOrder(
    id: Number,
    customerEmailAddres: string | null = null,
    dateOrderPlaced: string | null = null,
    orderStatus: string | null = null
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
      db.run(deleteOrder(id), (err: Error | null, _: RunResult) => (err ? reject(err) : resolve()))
    );
  }
}

export default OrderTable;
