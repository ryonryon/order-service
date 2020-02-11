import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import { INERNAL_SERVER_ERROR } from "../../constants/errors";

async function getOrders(_: Request, res: Response) {
  try {
    res.status(200).send(await OrderTable.getOrders());
  } catch (err) {
    res.status(500).send(INERNAL_SERVER_ERROR.message());
  }
}

export default getOrders;
