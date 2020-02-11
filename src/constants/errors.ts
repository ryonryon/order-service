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

export const INERNAL_SERVER_ERROR = {
  type: "INERNAL_SERVER_ERROR",
  message: (): string => "Internal Server Error: Your request was fail due to the internal server error."
};

export const AVAILABLE_QUANTITY_ERROR = {
  type: "AVAILABLE_QUANTITY_ERROR",
  message: (id: number): string => `Available Quantity Error: Inventory id ${id} doesn't have enough quantity.`
};
