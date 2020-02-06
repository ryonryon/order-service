import DBSqlite3 from "./dbSqlite3";

import {
  createOrderTable,
  selectOrders,
  selectOrder,
  insertOrder,
  updateOrderItem,
  deleteOrder
} from "./orderQueries";

class OrderTable {
  static async createOrder(customerEmailAddress, dateOrderPlaced, orderStatus) {
    const db = new DBSqlite3();
    await db.serialize(async () => {
      await db.run(createOrderTable());
      await db.run(
        insertOrder(customerEmailAddress, dateOrderPlaced, orderStatus)
      );
    });
  }

  static async getOrders() {
    const db = new DBSqlite3();
    return new Promise((resolve, reject) =>
      db.all(selectOrders(), (err, rows) => (err ? reject(err) : resolve(rows)))
    );
  }

  static async getOrder(id) {
    const db = new DBSqlite3();
    return new Promise((resolve, reject) =>
      db.get(selectOrder(id), (err, row) => (err ? reject(err) : resolve(row)))
    );
  }

  static async updateOrder(
    id,
    customerEmailAddres = null,
    dateOrderPlaced = null,
    orderStatus = null
  ) {
    const db = new DBSqlite3();
    return await db.serialize(async () => {
      await db.run(
        updateOrderItem(id, customerEmailAddres, dateOrderPlaced, orderStatus)
      );
    });
  }

  static deleteOrder(id) {
    const db = new DBSqlite3();
    return new Promise((resolve, reject) =>
      db.run(deleteOrder(id), (err, _) => (err ? reject(err) : resolve()))
    );
  }
}

export default OrderTable;
