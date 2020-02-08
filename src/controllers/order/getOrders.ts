import { Request, Response } from "express";

import { CONNECTION_ERROR } from "../../constants";
import OrderTable from "../../repositories/orderRepository";

async function getOrders(_: Request, res: Response) {
  try {
    res.status(200).send(await OrderTable.getOrders());
  } catch (err) {
    res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default getOrders;
