import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import { INVALID_ORDER_ID_ERROR, INERNAL_SERVER_ERROR } from "../../constants/errors";

async function getOrderById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const order = await OrderTable.getOrder(id);
    if (order === null) throw INVALID_ORDER_ID_ERROR.type;

    res.status(200).send(order.orderObject);
  } catch (err) {
    if (err === INVALID_ORDER_ID_ERROR.type) res.status(400).send(INVALID_ORDER_ID_ERROR.message(id));
    else res.status(500).send(INERNAL_SERVER_ERROR.message());
  }
}

export default getOrderById;
