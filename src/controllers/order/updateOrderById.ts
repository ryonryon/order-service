import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import {
  INVALID_ORDER_ID_ERROR,
  INVALID_ITEM_TYPE_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_DATE_ERROR,
  CONNECTION_ERROR,
  ORDERS
} from "../../constants";
import { checkType, checkDate, TYPE, checkEmail } from "../../validations";

async function updateOrderById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const customerEmailAddress = req.body[ORDERS.COSUTOMER_EMAIL_ADDRESS];
  const dateOrderPlaced = req.body[ORDERS.DATE_ORDER_PLACED];
  const orderStatus = req.body[ORDERS.ORDER_STATUS];

  try {
    const order = await OrderTable.getOrder(id);
    if (order === undefined) throw INVALID_ORDER_ID_ERROR.type;

    if (customerEmailAddress !== undefined) {
      checkType(customerEmailAddress, ORDERS.COSUTOMER_EMAIL_ADDRESS, TYPE.STRING);
      checkEmail(customerEmailAddress);
    }

    if (dateOrderPlaced !== undefined) {
      checkType(dateOrderPlaced, ORDERS.DATE_ORDER_PLACED, TYPE.STRING);
      checkDate(dateOrderPlaced);
    }

    if (orderStatus !== undefined) {
      checkType(orderStatus, ORDERS.ORDER_STATUS, TYPE.STRING);
    }

    await OrderTable.updateOrder(id, customerEmailAddress, dateOrderPlaced, orderStatus);

    res.status(200).send("The order is successfully updated");
  } catch (err) {
    if (err.error_type === INVALID_ORDER_ID_ERROR.type) {
      res.status(400).send(INVALID_ORDER_ID_ERROR.message(id));
    }
    if (err.error_type === INVALID_ITEM_TYPE_ERROR.type) {
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type));
    } else if (err.error_type === INVALID_EMAIL_ERROR.type) {
      res.status(400).send(INVALID_EMAIL_ERROR.message(err.email));
    } else if (err.error_type === INVALID_DATE_ERROR.type) {
      res.status(400).send(INVALID_DATE_ERROR.message(dateOrderPlaced));
    } else res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default updateOrderById;
