export const INVALID_PARAM_ERROR = {
  type: "INVALID_PARAM_ERROR",
  message: id => `Invalid Paramater Error: The inventory id ${id} isn't exist.`
};

export const VALIDATION_ERROR = {
  type: "VALIDATION_ERROR",
  message: (item, type) => `Validation Error: ${item} has to be ${type} type.`
};

export const CONNECTION_ERROR = {
  type: "CONNECTION_ERROR",
  message: () =>
    "Connection Error: Your request was fail due to the connection error."
};
