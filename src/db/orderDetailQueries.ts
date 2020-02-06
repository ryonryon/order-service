export const createOrderDetailTable = (): string =>
  `CREATE TABLE IF NOT EXISTS orders_detail (order_detail_id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, inventory_id INTEGER, quantity INTEGER);`;

export const insertOrderDetail = (orderId: number, inventoryId: number, quantity: number): string =>
  `INSERT INTO orders_detail (order_id, inventory_id, quantity) VALUES (${orderId}, ${inventoryId}, ${quantity});`;
