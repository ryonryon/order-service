import OrderTable from "../../repositories/orderRepository";
import { INVALID_ORDER_ID_ERROR, CONNECTION_ERROR } from "../../constants";

async function getOrderById(req, res) {
  const id = req.params.id;

  try {
    const order = await OrderTable.getOrder(id);
    if (order === undefined) throw INVALID_ORDER_ID_ERROR.type;

    res.status(200).send(order);
  } catch (err) {
    if (err === INVALID_ORDER_ID_ERROR.type) res.status(400).send(INVALID_ORDER_ID_ERROR.message(id));
    else res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default getOrderById;
