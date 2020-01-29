import { makeUpdateItemSyntax } from "./utils";

export const createOrderTable = () =>
  `
  CREATE TABLE IF NOT EXISTS order 
  (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT
    , customer_email_address TEXT
    , date_order_placed TEXT
    , order_status TEXT
    , product_id INTEGER
    , quantity INTEGER
  )
`;

export const insertOrder = ({
  customerEmailAddress,
  dateOrderPlaced,
  orderStatus
}) => ``;

export const selectOrders = () => `SELECT * FROM order`;

export const selectOrder = id => `SELECT * FROM order WHERE order_id = ${id}`;

export const updateOrder = (
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
    ["order_status", order_status],
    ["product_id", product_id],
    ["quantity", quantity]
  ]);

  return `UPDATE inventory SET ${items} WHERE inventory_id = ${id}`;
};

export const deleteOrder = id => `DELETE FROM order WHERE order_if = ${id}`;
