export const INVALID_INVENTORY_ID_ERROR = {
  type: "INVALID_INVENTORY_ID_ERROR",
  message: (id: number): string => `Invalid Paramater Error: The inventory id ${id} isn't exist.`
};
export const INVALID_ORDER_ID_ERROR = {
  type: "INVALID_ORDER_ID_ERROR",
  message: (id: number): string => `Invalid Paramater Error: The order id ${id} isn't exist.`
};

export const INVALID_ITEM_TYPE_ERROR = {
  type: "INVALID_ITEM_TYPE_ERROR",
  message: (item: string, type: string): string => `Invalid item type error: ${item} has to be ${type} type.`
};

export const INVALID_EMAIL_ERROR = {
  type: "INVALID_EMAIL_ERROR",
  message: (email: string): string => `Invalid Email Error: ${email} isn't valid`
};

export const INVALID_DATE_ERROR = {
  type: "INVALID_DATE_ERROR",
  message: (date: string): string => `Invalid Date Error: ${date} isn't valid`
};

export const CONNECTION_ERROR = {
  type: "CONNECTION_ERROR",
  message: (): string => "Connection Error: Your request was fail due to the connection error."
};

export const AVAILABLE_QUANTITY_ERROR = {
  type: "AVAILABLE_QUANTITY_ERROR",
  message: (id: number): string => `Available Quantity Error: Inventory id ${id} doesn't have enough quantity.`
};

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
