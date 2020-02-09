import { RunResult } from "sqlite3";

import dBSqlite3 from "../db/dbSqlite3";
import { updateInventoryItemQuantiy, selectInventoryItem } from "../db/invnetoryQueries";
import {
  insertOrderDetail,
  createOrderDetailTable,
  selectOrderDetail,
  updateOrderDetail,
  deleteOrderDetails
} from "../db/orderDetailQueries";
import {
  createOrderTable,
  selectOrders,
  selectOrder,
  selectOrderNewest,
  insertOrder,
  updateOrderItem,
  deleteOrder
} from "../db/orderQueries";
import {
  ORDERS,
  ORDERS_DETAIL,
  INVENTORIES,
  INVALID_INVENTORY_ID_ERROR,
  AVAILABLE_QUANTITY_ERROR,
  INVALID_ORDER_ID_ERROR
} from "../constants";

class OrderTable {
  static async createOrder(
    customerEmailAddress: string,
    dateOrderPlaced: string,
    orderStatus: string,
    orderItems: any[]
  ): Promise<void> {
    const db = dBSqlite3();
    new Promise((resolve, reject) => {
      db.serialize(async () => {
        db.run(createOrderTable());
        db.run(createOrderDetailTable());
        db.run(insertOrder(customerEmailAddress, dateOrderPlaced, orderStatus));

        const order = await new Promise<any>((resolve, _) =>
          db.get(selectOrderNewest(), (err, row) => (err ? reject(err) : resolve(row)))
        );

        await new Promise((resolve, reject) => {
          orderItems.forEach(async orderItem => {
            const [inventoryId, quantity] = [orderItem[ORDERS_DETAIL.INVNETORY_ID], orderItem[ORDERS_DETAIL.QUANTITY]];
            const inventory: any = await new Promise((resolve, _) =>
              db.get(selectInventoryItem(inventoryId), (err: Error | null, _inventory: any) =>
                err ? reject(err) : resolve(_inventory)
              )
            );
            if (inventory === undefined) reject(INVALID_INVENTORY_ID_ERROR.type);
            if (inventory[INVENTORIES.QUANTITY_AVAILABLE] < quantity) reject(AVAILABLE_QUANTITY_ERROR.type);

            db.run(
              updateInventoryItemQuantiy(
                orderItem[INVENTORIES.INVNETORY_ID],
                inventory[INVENTORIES.QUANTITY_AVAILABLE] - quantity
              ),
              (err: Error | null) => {
                if (err) reject(err);
              }
            );
            db.run(insertOrderDetail(order[ORDERS.ORDER_ID], inventoryId, quantity), (err: Error | null) =>
              err ? reject(err) : resolve()
            );
          });
        });

        return resolve();
      });
    });
  }

  static getOrders(): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectOrders(), (err, orders) => (err ? reject(err) : resolve(orders)))
    );
  }

  static getOrder(id: number): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectOrder(id), (err, orders) => (err ? reject(err) : resolve(orders)))
    );
  }

  static getOrderDetail(orderId: number, inventoryId: number): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.get(selectOrderDetail(orderId, inventoryId), (err: Error | null, orderDetail: any) =>
        err ? reject(err) : resolve(orderDetail)
      );
    });
  }

  static updateOrder(
    orderId: number,
    customerEmailAddres: string | null,
    dateOrderPlaced: string | null,
    orderStatus: string | null,
    inputOrderDetails: any[] | null
  ): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(
          updateOrderItem(orderId, customerEmailAddres, dateOrderPlaced, orderStatus),
          (err: Error | null, _: RunResult) => {
            if (err) return reject(err);
          }
        );

        if (!inputOrderDetails) return resolve();

        inputOrderDetails.forEach(async inputOrderDetail => {
          const orderDetail = await new Promise<any>((resolve, _) => {
            db.get(
              selectOrderDetail(orderId, inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID]),
              (err: Error | null, _orderDetail: any) => (err ? reject(err) : resolve(_orderDetail))
            );
          });

          const inventory = await new Promise<any>((resolve, _) => {
            db.get(
              selectInventoryItem(inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID]),
              (err: Error | null, _inventory: any) => (err ? reject(err) : resolve(_inventory))
            );
          });

          await new Promise<void>((resolve, _) => {
            db.run(
              updateInventoryItemQuantiy(
                inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID],
                inventory[INVENTORIES.QUANTITY_AVAILABLE] +
                  inputOrderDetail[ORDERS_DETAIL.QUANTITY] -
                  orderDetail[ORDERS_DETAIL.QUANTITY]
              ),
              (_: RunResult, err: Error | null) => (err ? reject(err) : resolve())
            );
          });

          await new Promise<void>((resolve, _) => {
            db.run(
              updateOrderDetail(
                inputOrderDetail[ORDERS_DETAIL.ORDER_ID],
                inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID],
                inputOrderDetail[ORDERS_DETAIL.QUANTITY]
              ),
              (_: RunResult, err: Error | null) => (err ? reject(err) : resolve())
            );
          });
        });

        return resolve();
      });
    });
  }

  static deleteOrder(orderId: number): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.serialize(async () => {
        const order = await new Promise<any[]>((resolve, _) =>
          db.all(selectOrder(orderId), (err: Error | null, _order: any[]) => (err ? reject(err) : resolve(_order)))
        );

        if (order === undefined) reject(INVALID_ORDER_ID_ERROR.type);

        await new Promise(async (resolve, _) => {
          order.forEach(async orderDetail => {
            const inventory = await new Promise<any>((resolve, _) => {
              db.get(
                selectInventoryItem(orderDetail[ORDERS_DETAIL.INVNETORY_ID]),
                (err: Error | null, _inventory: any) => (err ? reject(err) : resolve(_inventory))
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
          resolve();
        });

        await new Promise((resolve, _) =>
          db.run(deleteOrder(orderId), (err: Error | null, _: RunResult) => (err ? reject(err) : resolve()))
        );

        await new Promise((resolve, _) =>
          db.run(deleteOrderDetails(orderId), (err: Error | null, _: RunResult) => (err ? reject(err) : resolve()))
        );

        return resolve();
      })
    );
  }
}

export default OrderTable;
