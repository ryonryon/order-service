import { makeUpdateItemSyntax } from "./utils";
import { ORDERS, ORDERS_DETAIL } from "../constants";

export const q_reateOrderTable = () =>
  `CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_email_address TEXT, date_order_placed TEXT, order_status TEXT);`;

export const q_insertOrder = (customerEmailAddress: string, dateOrderPlaced: string, orderStatus: string) =>
  `INSERT INTO orders (customer_email_address, date_order_placed, order_status) VALUES ("${customerEmailAddress}", "${dateOrderPlaced}", "${orderStatus}");`;

export const q_selectOrders = (): string =>
  `SELECT orders.*, orders_detail.* FROM orders INNER JOIN orders_detail ON orders.order_id = orders_detail.order_id;`;

export const q_selectOrder = (id: number): string =>
  `SELECT orders.*, orders_detail.* FROM orders INNER JOIN orders_detail ON orders.order_id = orders_detail.order_id WHERE orders.order_id = ${id};`;

export const q_selectOrderNewest = (): string => "SELECT MAX(order_id) as order_id FROM orders";

export const q_updateOrderItem = (
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

export const q_deleteOrder = (id: Number): string => `DELETE FROM orders WHERE order_id = ${id};`;
