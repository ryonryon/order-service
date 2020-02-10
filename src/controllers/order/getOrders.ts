import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import { CONNECTION_ERROR } from "../../constants";

async function getOrders(_: Request, res: Response) {
  try {
    res.status(200).send(await OrderTable.getOrders());
  } catch (err) {
    res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default getOrders;
