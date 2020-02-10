export const q_createOrderDetailTable = (): string =>
  `CREATE TABLE IF NOT EXISTS orders_detail (order_detail_id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, inventory_id INTEGER, quantity INTEGER);`;

export const q_insertOrderDetail = (orderId: number, inventoryId: number, quantity: number): string =>
  `INSERT INTO orders_detail (order_id, inventory_id, quantity) VALUES (${orderId}, ${inventoryId}, ${quantity});`;

export const q_selectOrderDetail = (orderId: number, inventoryId: number) =>
  `SELECT order_id, inventory_id, quantity FROM orders_detail WHERE order_id = ${orderId} AND inventory_id = ${inventoryId};`;

export const q_updateOrderDetail = (orderId: number, inventoryId: number, quantity: number): string =>
  `UPDATE orders_detail SET quantity = ${quantity} WHERE order_id = ${orderId} AND inventory_id = ${inventoryId};`;

export const q_deleteOrderDetails = (orderId: number): string =>
  `DELETE FROM orders_detail WHERE order_id = ${orderId};`;
