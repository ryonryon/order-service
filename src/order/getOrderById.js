import OrderTable from "../db/orderTable";
import { INVALID_PARAM_ERROR } from "../constants";

async function getOrderById(req, res) {
  const id = req.params.id;

  try {
    console.log(id);
    const order = await OrderTable.getOrder(id);
    console.log(order);
    if (order === undefined) throw INVALID_PARAM_ERROR.type;

    res.status(200).send(order);
  } catch (err) {
    if (err === INVALID_PARAM_ERROR.type)
      res.status(400).send(INVALID_PARAM_ERROR.message(inventryId));

    res.status(500).send(INVALID_PARAM_ERROR.message());
  }
}

export default getOrderById;
