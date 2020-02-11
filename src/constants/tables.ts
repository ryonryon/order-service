export enum INVENTORIES {
  INVNETORY_ID = "inventory_id",
  NAME = "name",
  DESCRIPTION = "description",
  PRICE = "price",
  QUANTITY_AVAILABLE = "quantity_available"
}

export enum ORDERS {
  ORDER_ID = "order_id",
  COSUTOMER_EMAIL_ADDRESS = "customer_email_address",
  DATE_ORDER_PLACED = "date_order_placed",
  ORDER_STATUS = "order_status"
}

export enum ORDERS_DETAIL {
  ORDER_DETAIL_ID = "order_detail_id",
  ORDER_ID = "order_id",
  INVNETORY_ID = "inventory_id",
  QUANTITY = "quantity"
}
