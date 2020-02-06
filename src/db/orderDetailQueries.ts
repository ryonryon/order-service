export const createOrderDetailTable = () =>
  `CREATE TABLE IF NOT EXISTS orders_detail (order_detail_id INTEGER, order_id INTEGER, inventory_id INTEGER, quantity INTEGER);`

export const insertOrderDetail = (orderId, inventoryId, quantity) =>
  `INSERT INTO orders (order_id, inventory_id, quantity) VALUES ("${orderId}", "${inventoryId}", "${quantity}");`
