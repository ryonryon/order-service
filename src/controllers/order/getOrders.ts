import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import { INERNAL_SERVER_ERROR } from "../../constants/errors";
import Order from "../../entities/order";

async function getOrders(_: Request, res: Response) {
  try {
    const orders = await OrderTable.getOrders();

    res.status(200).send(orders.map((order: Order) => order.orderObject));
  } catch (err) {
    res.status(500).send(INERNAL_SERVER_ERROR.message());
  }
}

export default getOrders;
