import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import { INVALID_ORDER_ID_ERROR, INERNAL_SERVER_ERROR } from "../../constants/errors";
import { ORDERS, ORDERS_DETAIL } from "../../constants/tables";

async function getOrderById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const order = await OrderTable.getOrder(id);
    if (order.length === 0) throw INVALID_ORDER_ID_ERROR.type;

    res.status(200).send({
      order_id: order[0][ORDERS.ORDER_ID],
      customer_email_address: order[0][ORDERS.COSUTOMER_EMAIL_ADDRESS],
      date_order_placed: order[0][ORDERS.DATE_ORDER_PLACED],
      order_status: order[0][ORDERS.ORDER_STATUS],
      details: order.map((orderDetail: any) => ({
        order_detail_id: orderDetail[ORDERS_DETAIL.ORDER_DETAIL_ID],
        inventory_id: orderDetail[ORDERS_DETAIL.INVNETORY_ID],
        quantity: orderDetail[ORDERS_DETAIL.QUANTITY]
      }))
    });
  } catch (err) {
    if (err === INVALID_ORDER_ID_ERROR.type) res.status(400).send(INVALID_ORDER_ID_ERROR.message(id));
    else res.status(500).send(INERNAL_SERVER_ERROR.message());
  }
}

export default getOrderById;
