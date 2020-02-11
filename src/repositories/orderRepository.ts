import { RunResult } from "sqlite3";

import dBSqlite3 from "../db/dbSqlite3";
import {
  qInsertOrderDetail,
  qCreateOrderDetailTable,
  qSelectOrderDetail,
  qUpdateOrderDetail,
  qDeleteOrderDetails
} from "../db/orderDetailQueries";
import {
  qCreateOrderTable,
  qSelectOrders,
  qSelectOrder,
  qSelectOrderNewest,
  qInsertOrder,
  qUpdateOrderItem,
  qDeleteOrder
} from "../db/orderQueries";
import { INVALID_INVENTORY_ID_ERROR, AVAILABLE_QUANTITY_ERROR, INVALID_ORDER_ID_ERROR } from "../constants/errors";
import { ORDERS, ORDERS_DETAIL, INVENTORIES } from "../constants/tables";
import InventoryTable from "./inventoryRepository";

class OrderTable {
  static createOrdersTable(): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(qCreateOrderTable, (err: Error | null) => (err ? reject(err) : resolve()))
    );
  }

  static createOrderDetailTable(): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(qCreateOrderDetailTable, (err: Error | null) => (err ? reject(err) : resolve()))
    );
  }

  static insertOrder(customerEmailAddress: string, dateOrderPlaced: string, orderStatus: string): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(qInsertOrder, [customerEmailAddress, dateOrderPlaced, orderStatus], (err: Error | null) =>
        err ? reject(err) : resolve()
      )
    );
  }

  static selectNewestOrder(): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.get(qSelectOrderNewest, (err, row) => (err ? reject(err) : resolve(row)))
    );
  }

  static insertOrderDetail(orderId: number, inventoryId: number, quantity: number): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(qInsertOrderDetail, [orderId, inventoryId, quantity], (err: Error | null) =>
        err ? reject(err) : resolve()
      )
    );
  }

  static async postOrder(
    customerEmailAddress: string,
    dateOrderPlaced: string,
    orderStatus: string,
    orderItems: any[]
  ): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.serialize(async () => {
        await this.createOrdersTable();
        await this.createOrderDetailTable();
        await this.insertOrder(customerEmailAddress, dateOrderPlaced, orderStatus);

        const order = await this.selectNewestOrder();
        orderItems.forEach(async orderItem => {
          const [inventoryId, quantity] = [orderItem[ORDERS_DETAIL.INVNETORY_ID], orderItem[ORDERS_DETAIL.QUANTITY]];
          const inventory: any = await InventoryTable.getInventory(inventoryId);

          if (inventory === null) reject(INVALID_INVENTORY_ID_ERROR.type);
          if (inventory[INVENTORIES.QUANTITY_AVAILABLE] < quantity) reject(AVAILABLE_QUANTITY_ERROR.type);

          await InventoryTable.updateInventory(
            orderItem[INVENTORIES.INVNETORY_ID],
            null,
            null,
            null,
            inventory[INVENTORIES.QUANTITY_AVAILABLE] - quantity
          );

          await this.insertOrderDetail(order[ORDERS.ORDER_ID], inventoryId, quantity);
        });

        return resolve();
      });
    });
  }

  static getOrders(): Promise<any[]> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(qSelectOrders, (err, orders) => (err ? reject(err) : resolve(orders)))
    );
  }

  static getOrder(id: number): Promise<any[]> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(qSelectOrder, [id], (err, orders) => (err ? reject(err) : resolve(orders)))
    );
  }

  static getOrderDetail(orderId: number, inventoryId: number): Promise<any> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.get(qSelectOrderDetail, [orderId, inventoryId], (err: Error | null, orderDetails: any) =>
        err ? reject(err) : resolve(orderDetails)
      );
    });
  }

  static updateOrder(
    orderId: number,
    customerEmailAddres: string | null,
    dateOrderPlaced: string | null,
    orderStatus: string | null
  ): Promise<void> {
    const db = dBSqlite3();
    const [updateOrderQuery, params] = qUpdateOrderItem(orderId, customerEmailAddres, dateOrderPlaced, orderStatus);
    return new Promise((resolve, reject) =>
      db.run(updateOrderQuery, params, (err: Error | null, _: RunResult) => {
        return err ? reject(err) : resolve();
      })
    );
  }

  static updateOrderDetail(orderId: number, inventoryId: number, quantity: number): Promise<void> {
    const db = dBSqlite3();
    return new Promise<void>((resolve, reject) =>
      db.run(qUpdateOrderDetail, [quantity, orderId, inventoryId], (_: RunResult, err: Error | null) =>
        err ? reject(err) : resolve()
      )
    );
  }

  private static updateOrderDetails(orderId: number, inputOrderDetails: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      inputOrderDetails.forEach(async inputOrderDetail => {
        const inventory = await InventoryTable.getInventory(inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID]);
        if (inventory === null) reject(INVALID_INVENTORY_ID_ERROR.type);

        const orderDetail = await this.getOrderDetail(orderId, inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID]);

        if (orderDetail === undefined) {
          await InventoryTable.updateInventory(
            inventory[INVENTORIES.INVNETORY_ID],
            null,
            null,
            null,
            inventory[INVENTORIES.QUANTITY_AVAILABLE] - inputOrderDetail[ORDERS_DETAIL.QUANTITY]
          );

          await this.insertOrderDetail(
            orderId,
            inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID],
            inputOrderDetail[ORDERS_DETAIL.QUANTITY]
          );
        } else {
          await InventoryTable.updateInventory(
            inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID],
            null,
            null,
            null,
            inventory[INVENTORIES.QUANTITY_AVAILABLE] +
              orderDetail[ORDERS_DETAIL.QUANTITY] -
              inputOrderDetail[ORDERS_DETAIL.QUANTITY]
          );

          await this.updateOrderDetail(
            orderId,
            inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID],
            inputOrderDetail[ORDERS_DETAIL.QUANTITY]
          );
        }
      });

      return resolve();
    });
  }

  static putOrder(
    orderId: number,
    customerEmailAddress: string | null,
    dateOrderPlaced: string | null,
    orderStatus: string | null,
    inputOrderDetails: any[] | null
  ): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) => {
      db.serialize(async () => {
        const order = await this.getOrder(orderId);
        if (order.length === 0) reject(INVALID_ORDER_ID_ERROR.type);

        await this.updateOrder(orderId, customerEmailAddress, dateOrderPlaced, orderStatus);

        if (inputOrderDetails) await this.updateOrderDetails(orderId, inputOrderDetails);

        return resolve();
      });
    });
  }

  static deleteOrderItem(orderId: number): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(qDeleteOrder, [orderId], (err: Error | null, _: RunResult) => (err ? reject(err) : resolve()))
    );
  }
  static deleteOrderItemDetails(orderId: number): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(qDeleteOrderDetails, [orderId], (err: Error | null, _: RunResult) => (err ? reject(err) : resolve()))
    );
  }

  static deleteOrder(orderId: number): Promise<void> {
    const db = dBSqlite3();
    return new Promise((resolve, reject) =>
      db.serialize(async () => {
        const order = await this.getOrder(orderId);

        if (order.length === 0) reject(INVALID_ORDER_ID_ERROR.type);

        await new Promise(async (resolve, _) => {
          order.forEach(async orderDetail => {
            const inventory = await InventoryTable.getInventory(orderDetail[ORDERS_DETAIL.INVNETORY_ID]);

            await InventoryTable.updateInventory(
              orderDetail[ORDERS_DETAIL.INVNETORY_ID],
              null,
              null,
              null,
              inventory[INVENTORIES.QUANTITY_AVAILABLE] + orderDetail[ORDERS_DETAIL.QUANTITY]
            );
          });
          resolve();
        });

        await this.deleteOrderItem(orderId);

        await this.deleteOrderItemDetails(orderId);

        return resolve();
      })
    );
  }
}

export default OrderTable;
