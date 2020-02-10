import { makeUpdateItemSyntax } from "./utils";
import { ORDERS, ORDERS_DETAIL } from "../constants";

export const qCreateOrderTable = () =>
  `CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_email_address TEXT, date_order_placed TEXT, order_status TEXT);`;

export const qInsertOrder = `INSERT INTO orders (customer_email_address, date_order_placed, order_status) VALUES (?, ?, ?);`;

export const qSelectOrders = (): string =>
  `SELECT orders.*, orders_detail.* FROM orders INNER JOIN orders_detail ON orders.order_id = orders_detail.order_id;`;

export const qSelectOrder = (id: number): string =>
  `SELECT orders.*, orders_detail.* FROM orders INNER JOIN orders_detail ON orders.order_id = orders_detail.order_id WHERE orders.order_id = ${id};`;

export const qSelectOrderNewest = (): string => "SELECT MAX(order_id) as order_id FROM orders";

export const qUpdateOrderItem = (
  id: number,
  customerEmailAddress: string | null = null,
  dateOrderPlaced: string | null = null,
  orderStatus: string | null = null,
  inventoryId: string | null = null,
  quantity: string | null = null
): string => {
  const items = makeUpdateItemSyntax([
    [ORDERS.COSUTOMER_EMAIL_ADDRESS, customerEmailAddress],
    [ORDERS.DATE_ORDER_PLACED, dateOrderPlaced],
    [ORDERS.ORDER_STATUS, orderStatus],
    [ORDERS_DETAIL.INVNETORY_ID, inventoryId],
    [ORDERS_DETAIL.QUANTITY, quantity]
  ]);

  return `UPDATE orders SET ${items} WHERE order_id = ${id};`;
};

export const qDeleteOrder = (id: Number): string => `DELETE FROM orders WHERE order_id = ${id};`;
