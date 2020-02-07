import { RunResult } from "sqlite3";

import dBSqlite3 from "../db/dbSqlite3";
import { updateInventoryItemQuantiy, selectInventoryItem } from "../db/invnetoryQueries";
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
    id: number,
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

  static deleteOrder(id: number): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.serialize(() => {
        db.all(selectOrder(id), (err: Error | null, rows: any[]) => {
          if (err) return reject(err);
          rows.forEach(orderDetail => {
            db.get(selectInventoryItem(orderDetail["inventory_id"]), (err: Error | null, row: any) => {
              if (err) return reject(err);
              db.run(
                updateInventoryItemQuantiy(
                  orderDetail["inventory_id"],
                  row["quantity_available"] + orderDetail["quantity"]
                ),
                (err: Error | null) => reject(err)
              );
            });
          });
        });
        db.run(deleteOrder(id), (err: Error | null, _: RunResult) => (err ? reject(err) : resolve()));
        return resolve();
      })
    );
  }
}

export default OrderTable;
