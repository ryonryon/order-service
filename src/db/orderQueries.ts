import { makeUpdateItemSyntax } from './utils'

export const createOrderTable = () =>
  `CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_email_address TEXT, date_order_placed TEXT, order_status TEXT);`

export const insertOrder = (customerEmailAddress, dateOrderPlaced, orderStatus) =>
  `INSERT INTO orders (customer_email_address, date_order_placed, order_status) VALUES ("${customerEmailAddress}", "${dateOrderPlaced}", "${orderStatus}");`

export const insertOrderDetail = ({ orderId, inventoryId, quantity }) =>
  `INSERT INTO orders_detail (order_id, inventory_id, quantity) VALUES ("${orderId}", "${inventoryId}", "${quantity}");`

export const selectOrders = (): string => `SELECT * FROM orders;`

export const selectOrder = (id: Number): string => `SELECT * FROM orders WHERE order_id = ${id};`

export const updateOrderItem = (
  id: Number,
  customerEmailAddress: String | null = null,
  dateOrderPlaced: String | null = null,
  orderStatus: String | null = null,
  productId: String | null = null,
  quantity: String | null = null
): string => {
  const items = makeUpdateItemSyntax([
    ['customer_email_address', customerEmailAddress],
    ['date_order_placed', dateOrderPlaced],
    ['order_status', orderStatus],
    ['product_id', productId],
    ['quantity', quantity]
  ])

  return `UPDATE orders SET ${items} WHERE order_id = ${id};`
}

export const deleteOrder = (id: Number): string => `DELETE FROM orders WHERE order_id = ${id};`