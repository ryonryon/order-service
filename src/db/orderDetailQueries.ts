export const qCreateOrderDetailTable = `CREATE TABLE IF NOT EXISTS orders_detail (order_detail_id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, inventory_id INTEGER, quantity INTEGER);`;

export const qInsertOrderDetail = `INSERT INTO orders_detail (order_id, inventory_id, quantity) VALUES (?, ?, ?);`;

export const qSelectOrderDetail = `SELECT * FROM orders_detail WHERE order_id = ? AND inventory_id = ?;`;

export const qUpdateOrderDetail = `UPDATE orders_detail SET quantity = ? WHERE order_id = ? AND inventory_id = ?;`;

export const qDeleteOrderDetails = `DELETE FROM orders_detail WHERE order_id = ?;`;
