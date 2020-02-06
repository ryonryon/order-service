import {
  INVALID_ITEM_TYPE_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_DATE_ERROR
} from "./constants";

export function checkType(value, valueKey, type) {
  if (typeof value !== type)
    throw {
      error_type: INVALID_ITEM_TYPE_ERROR.type,
      name: valueKey,
      type: type
    };
}

export function checkEmail(email) {
  if (!email.match(/\S+@\S+\.\S+/))
    throw {
      error_type: INVALID_EMAIL_ERROR.type,
      email: email
    };
}

export function checkDate(date) {
  let invalid = false;

  if (!date.match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/)) invalid = true;

  const [month, day] = [
    Number(date.substring(5, 7)),
    Number(date.substring(8, 10))
  ];
  if (month < 1 || 12 < month) invalid = true;
  if (day < 1 || 31 < day) invalid = true;

  if (invalid)
    throw {
      error_type: INVALID_DATE_ERROR.type,
      date: date
    };
}

export const TYPE = {
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean"
};
