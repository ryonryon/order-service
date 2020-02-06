export const INVALID_INVENTORY_ID_ERROR = {
  type: "INVALID_INVENTORY_ID_ERROR",
  message: id => `Invalid Paramater Error: The inventory id ${id} isn't exist.`
};
export const INVALID_ORDER_ID_ERROR = {
  type: "INVALID_ORDER_ID_ERROR",
  message: id => `Invalid Paramater Error: The order id ${id} isn't exist.`
};

export const INVALID_ITEM_TYPE_ERROR = {
  type: "INVALID_ITEM_TYPE_ERROR",
  message: (item, type) =>
    `Invalid item type error: ${item} has to be ${type} type.`
};

export const INVALID_EMAIL_ERROR = {
  type: "INVALID_EMAIL_ERROR",
  message: email => `Invalid Email Error: ${email} isn't valid`
};

export const INVALID_DATE_ERROR = {
  type: "INVALID_DATE_ERROR",
  message: date => `Invalid Date Error: ${date} isn't valid`
};

export const CONNECTION_ERROR = {
  type: "CONNECTION_ERROR",
  message: () =>
    "Connection Error: Your request was fail due to the connection error."
};
