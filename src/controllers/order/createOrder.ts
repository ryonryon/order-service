import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import {
  INERNAL_SERVER_ERROR,
  INVALID_ITEM_TYPE_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_DATE_ERROR,
  INVALID_INVENTORY_ID_ERROR,
  AVAILABLE_QUANTITY_ERROR
} from "../../constants/errors";
import { ORDERS, ORDERS_DETAIL } from "../../constants/tables";
import { checkType, checkDate, TYPE, checkEmail } from "../validations";

async function createOrder(req: Request, res: Response) {
  const customerEmailAddress = req.body[ORDERS.COSUTOMER_EMAIL_ADDRESS];
  const dateOrderPlaced = req.body[ORDERS.DATE_ORDER_PLACED];
  const orderStatus = req.body[ORDERS.ORDER_STATUS];
  const orderItems = req.body[ORDERS.DETAILS];

  try {
    checkType(customerEmailAddress, ORDERS.COSUTOMER_EMAIL_ADDRESS, TYPE.STRING);
    checkEmail(customerEmailAddress);
    checkType(dateOrderPlaced, ORDERS.DATE_ORDER_PLACED, TYPE.STRING);
    checkDate(dateOrderPlaced);
    checkType(orderStatus, ORDERS.ORDER_STATUS, TYPE.STRING);

    await orderItems.forEach(async (orderItem: any) => {
      checkType(orderItem[ORDERS_DETAIL.INVNETORY_ID], ORDERS_DETAIL.INVNETORY_ID, TYPE.NUMBER);
      checkType(orderItem[ORDERS_DETAIL.QUANTITY], ORDERS_DETAIL.QUANTITY, TYPE.NUMBER);
    });

    await OrderTable.postOrder(customerEmailAddress, dateOrderPlaced, orderStatus, orderItems);

    res.status(200).send("The order is successfully added.");
  } catch (err) {
    if (err.error_type === INVALID_ITEM_TYPE_ERROR.type) {
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type));
    } else if (err.error_type === INVALID_EMAIL_ERROR.type) {
      res.status(400).send(INVALID_EMAIL_ERROR.message(err.email));
    } else if (err.error_type === INVALID_DATE_ERROR.type) {
      res.status(400).send(INVALID_DATE_ERROR.message(dateOrderPlaced));
    } else if (err.error_type === INVALID_INVENTORY_ID_ERROR.type) {
      res.status(400).send(err.message());
    } else if (err.error_type === AVAILABLE_QUANTITY_ERROR.type) {
      res.status(400).send(err.message());
    } else res.status(500).send(INERNAL_SERVER_ERROR.message());
  }
}

export default createOrder;
