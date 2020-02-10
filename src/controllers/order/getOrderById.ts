import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import { INVALID_ORDER_ID_ERROR, CONNECTION_ERROR } from "../../constants";

async function getOrderById(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const order = await OrderTable.getOrder(id);
    if (order.length === 0) throw INVALID_ORDER_ID_ERROR.type;

    res.status(200).send(order);
  } catch (err) {
    if (err === INVALID_ORDER_ID_ERROR.type) res.status(400).send(INVALID_ORDER_ID_ERROR.message(id));
    else res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default getOrderById;
