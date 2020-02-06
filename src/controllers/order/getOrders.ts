import { CONNECTION_ERROR } from "../../constants";
import OrderTable from "../../repositories/orderRepository";

async function getOrders(_, res) {
  try {
    res.status(200).send(await OrderTable.getOrders());
  } catch (e) {
    res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default getOrders;
