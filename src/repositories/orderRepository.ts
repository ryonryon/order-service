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
import { ORDERS, ORDERS_DETAIL, INVENTORIES } from "../constants";

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
        db.get(selectOrderNewest(), (err, order) => {
          if (err) return reject(err);
          orderItems.forEach(orderItem => {
            db.run(updateInventoryItemQuantiy(orderItem.inventoryId, orderItem.newQuantityAvailable));
            db.run(insertOrderDetail(order[ORDERS.ORDER_ID], orderItem.inventoryId, orderItem.quantity));

            return resolve();
          });
        });
      });
    });
  }

  static getOrders(): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectOrders(), (err, orders) => {
        return err ? reject(err) : resolve(orders);
      })
    );
  }

  static getOrder(id: Number): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectOrder(id), (err, orders) => (err ? reject(err) : resolve(orders)))
    );
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
      db.serialize(async () => {
        const order = await new Promise<any[]>((resolve, _) =>
          db.all(selectOrder(id), (err: Error | null, _order: any[]) => (err ? reject(err) : resolve(_order)))
        );

        order.forEach(async orderDetail => {
          const inventory = await new Promise<any>((resolve, _) => {
            db.get(selectInventoryItem(orderDetail[ORDERS_DETAIL.INVNETORY_ID]), (err: Error | null, _inventory: any) =>
              err ? reject(err) : resolve(_inventory)
            );
          });

          await new Promise((resolve, _) => {
            db.run(
              updateInventoryItemQuantiy(
                orderDetail[ORDERS_DETAIL.INVNETORY_ID],
                inventory[INVENTORIES.QUANTITY_AVAILABLE] + orderDetail[ORDERS_DETAIL.QUANTITY]
              ),
              (err: Error | null, _: RunResult) => (err ? reject(err) : resolve())
            );
          });
        });

        await new Promise((resolve, _) => {
          db.run(deleteOrder(id), (err: Error | null, _: RunResult) => (err ? reject(err) : resolve()));
        });

        return resolve();
      })
    );
  }
}

export default OrderTable;
