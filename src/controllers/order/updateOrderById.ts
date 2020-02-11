import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import {
  INVALID_ORDER_ID_ERROR,
  INVALID_ITEM_TYPE_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_DATE_ERROR,
  INERNAL_SERVER_ERROR,
  INVALID_INVENTORY_ID_ERROR,
  AVAILABLE_QUANTITY_ERROR
} from "../../constants/errors";
import { ORDERS, ORDERS_DETAIL } from "../../constants/tables";
import { checkType, checkDate, TYPE, checkEmail } from "../validations";

async function updateOrderById(req: Request, res: Response) {
  const orderId = Number(req.params.id);
  const customerEmailAddress: string | null =
    req.body[ORDERS.COSUTOMER_EMAIL_ADDRESS] !== undefined ? req.body[ORDERS.COSUTOMER_EMAIL_ADDRESS] : null;
  const dateOrderPlaced: string | null =
    req.body[ORDERS.DATE_ORDER_PLACED] !== undefined ? req.body[ORDERS.DATE_ORDER_PLACED] : null;
  const orderStatus: string | null = req.body[ORDERS.ORDER_STATUS] !== undefined ? req.body[ORDERS.ORDER_STATUS] : null;
  const inputOrderDetails: any[] = req.body["details"] !== undefined ? req.body["details"] : null;

  try {
    const order = await OrderTable.getOrder(orderId);
    if (order.length === 0) throw INVALID_ORDER_ID_ERROR.type;

    if (customerEmailAddress !== null) {
      checkType(customerEmailAddress, ORDERS.COSUTOMER_EMAIL_ADDRESS, TYPE.STRING);
      checkEmail(customerEmailAddress);
    }

    if (dateOrderPlaced !== null) {
      checkType(dateOrderPlaced, ORDERS.DATE_ORDER_PLACED, TYPE.STRING);
      checkDate(dateOrderPlaced);
    }

    if (orderStatus !== null) checkType(orderStatus, ORDERS.ORDER_STATUS, TYPE.STRING);

    if (inputOrderDetails.length !== 0) {
      inputOrderDetails.forEach(async inputOrderDetail => {
        const orderDetailId: number | null =
          inputOrderDetail[ORDERS_DETAIL.ORDER_DETAIL_ID] !== undefined
            ? inputOrderDetail[ORDERS_DETAIL.ORDER_DETAIL_ID]
            : null;
        const inventoryId: number | null =
          inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID] !== undefined
            ? inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID]
            : null;
        const quantity: number | null =
          inputOrderDetail[ORDERS_DETAIL.QUANTITY] !== undefined ? inputOrderDetail[ORDERS_DETAIL.QUANTITY] : null;

        if (orderDetailId) checkType(orderDetailId, ORDERS_DETAIL.ORDER_DETAIL_ID, TYPE.NUMBER);
        if (!inventoryId) throw INVALID_INVENTORY_ID_ERROR.type;
        if (!quantity) throw AVAILABLE_QUANTITY_ERROR.type;
        checkType(inventoryId, ORDERS_DETAIL.INVNETORY_ID, TYPE.NUMBER);
        checkType(quantity, ORDERS_DETAIL.QUANTITY, TYPE.NUMBER);
      });
    }

    await OrderTable.putOrder(orderId, customerEmailAddress, dateOrderPlaced, orderStatus, inputOrderDetails);

    res.status(200).send("The order is successfully updated");
  } catch (err) {
    if (err.error_type === INVALID_ORDER_ID_ERROR.type) {
      res.status(400).send(INVALID_ORDER_ID_ERROR.message(orderId));
    } else if (err.error_type === INVALID_ITEM_TYPE_ERROR.type) {
      res.status(400).send(err.message);
    } else if (err.error_type === INVALID_EMAIL_ERROR.type) {
      res.status(400).send(err.message);
    } else if (err.error_type === INVALID_DATE_ERROR.type) {
      res.status(400).send(err.message);
    } else res.status(500).send(INERNAL_SERVER_ERROR.message());
  }
}

export default updateOrderById;
