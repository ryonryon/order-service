import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import {
  INVALID_ORDER_ID_ERROR,
  INVALID_ITEM_TYPE_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_DATE_ERROR,
  CONNECTION_ERROR,
  ORDERS,
  ORDERS_DETAIL,
  INVENTORIES
} from "../../constants";
import { checkType, checkDate, TYPE, checkEmail } from "../../validations";
import InventoryTable from "../../repositories/inventoryRepository";

async function updateOrderById(req: Request, res: Response) {
  const orderId = Number(req.params.id);
  const customerEmailAddress: string | null =
    req.body[ORDERS.COSUTOMER_EMAIL_ADDRESS] !== undefined ? req.body[ORDERS.COSUTOMER_EMAIL_ADDRESS] : null;
  const dateOrderPlaced: string | null =
    req.body[ORDERS.DATE_ORDER_PLACED] !== undefined ? req.body[ORDERS.DATE_ORDER_PLACED] : null;
  const orderStatus: string | null = req.body[ORDERS.ORDER_STATUS] !== undefined ? req.body[ORDERS.ORDER_STATUS] : null;
  const inputOrderDetails: any[] = req.body["items"] !== undefined ? req.body["items"] : null;

  try {
    const order = await OrderTable.getOrder(orderId);
    if (order === undefined) throw INVALID_ORDER_ID_ERROR.type;

    if (customerEmailAddress !== null) {
      checkType(customerEmailAddress, ORDERS.COSUTOMER_EMAIL_ADDRESS, TYPE.STRING);
      checkEmail(customerEmailAddress);
    }

    if (dateOrderPlaced !== null) {
      checkType(dateOrderPlaced, ORDERS.DATE_ORDER_PLACED, TYPE.STRING);
      checkDate(dateOrderPlaced);
    }

    if (orderStatus !== null) checkType(orderStatus, ORDERS.ORDER_STATUS, TYPE.STRING);

    if (inputOrderDetails !== null) {
      inputOrderDetails.forEach(async inputOrderDetail => {
        const inventoryId: number | null =
          inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID] !== undefined
            ? inputOrderDetail[ORDERS_DETAIL.INVNETORY_ID]
            : null;
        const quantity: number | null =
          inputOrderDetail[ORDERS_DETAIL.QUANTITY] !== undefined ? inputOrderDetail[ORDERS_DETAIL.QUANTITY] : null;

        if (!inventoryId) throw {}; // TODO inventory id is missing
        if (!quantity) throw {}; // TODO quantity is missing

        const inventory = await InventoryTable.getInventory(inventoryId);

        if (inventory === undefined) throw {}; // TODO inventory id is not valid

        const orderDetail = await OrderTable.getOrderDetail(orderId, inventoryId);
        if (inventory[INVENTORIES.QUANTITY_AVAILABLE] < quantity - orderDetail[ORDERS_DETAIL.QUANTITY]) throw {}; // TODO quantity isn't enought;
      });
    }

    await OrderTable.updateOrder(orderId, customerEmailAddress, dateOrderPlaced, orderStatus, inputOrderDetails);

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
    } else res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default updateOrderById;
