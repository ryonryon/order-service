import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import { INVALID_ORDER_ID_ERROR, CONNECTION_ERROR } from "../../constants";

async function deleteOrderById(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    await OrderTable.deleteOrder(id);

    res.status(200).send("The order is successfully deleted.");
  } catch (err) {
    if (err === INVALID_ORDER_ID_ERROR.type) {
      res.status(400).send(INVALID_ORDER_ID_ERROR.message(id));
    } else res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default deleteOrderById;
