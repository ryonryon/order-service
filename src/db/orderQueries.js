import { makeUpdateItemSyntax } from "./utils";

export const createOrderTable = () =>
  `CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_email_address TEXT, date_order_placed TEXT, order_status TEXT);`;

export const createOrderDetailTable = () =>
  `CREATE TABLE IF NOT EXISTS orders_detail (order_id INTEGER, inventory_id INTEGER, quantity INTEGER);`;

export const insertOrder = (
  customerEmailAddress,
  dateOrderPlaced,
  orderStatus
) =>
  `INSERT INTO orders (customer_email_address, date_order_placed, order_status) VALUES ("${customerEmailAddress}", "${dateOrderPlaced}", "${orderStatus}");`;

export const insertOrderDetail = ({ orderId, inventoryId, quantity }) =>
  `INSERT INTO orders_detail (order_id, inventory_id, quantity) VALUES ("${orderId}", "${inventoryId}", "${quantity}");`;

export const selectOrders = () => `SELECT * FROM orders;`;

export const selectOrder = id => `SELECT * FROM orders WHERE order_id = ${id};`;

export const updateOrderItem = (
  id,
  customer_email_address = null,
  date_order_placed = null,
  order_status = null,
  product_id = null,
  quantity = null
) => {
  if (
    !customer_email_address &&
    !date_order_placed &&
    !order_status &&
    !product_id &&
    !quantity
  )
    return null;
  const items = makeUpdateItemSyntax([
    ["customer_email_address", customer_email_address],
    ["date_order_placed", date_order_placed],
    ["order_status", order_status]
  ]);

  return `UPDATE orders SET ${items} WHERE order_id = ${id};`;
};

export const deleteOrder = id => `DELETE FROM orders WHERE order_id = ${id};`;
