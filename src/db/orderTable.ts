import dBSqlite3 from './dbSqlite3'

import { createOrderTable, selectOrders, selectOrder, insertOrder, updateOrderItem, deleteOrder } from './orderQueries'

class OrderTable {
  static createOrder(customerEmailAddress: String, dateOrderPlaced: String, orderStatus: String) {
    const db = dBSqlite3()
    db.serialize(() => {
      db.run(createOrderTable())
      db.run(insertOrder(customerEmailAddress, dateOrderPlaced, orderStatus))
    })
  }

  static getOrders() {
    const db = dBSqlite3()
    return new Promise((resolve, reject) => db.all(selectOrders(), (err, rows) => (err ? reject(err) : resolve(rows))))
  }

  static getOrder(id: Number) {
    const db = dBSqlite3()
    return new Promise((resolve, reject) => db.get(selectOrder(id), (err, row) => (err ? reject(err) : resolve(row))))
  }

  static updateOrder(
    id: Number,
    customerEmailAddres: String | null = null,
    dateOrderPlaced: String | null = null,
    orderStatus: String | null = null
  ) {
    const db = dBSqlite3()
    return db.serialize(async () => {
      db.run(updateOrderItem(id, customerEmailAddres, dateOrderPlaced, orderStatus))
    })
  }

  static deleteOrder(id: Number) {
    const db = dBSqlite3()
    return new Promise((resolve, reject) => db.run(deleteOrder(id), (err, _) => (err ? reject(err) : resolve())))
  }
}

export default OrderTable
