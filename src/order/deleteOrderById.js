import OrderTable from "../db/orderTable";
import { INVALID_PARAM_ERROR } from "../constants";

async function deleteOrderById(req, res) {
  const id = req.params.id;

  try {
    const order = await OrderTable.getOrder(id);
    if (order === undefined) throw INVALID_PARAM_ERROR.type;

    await OrderTable.deleteOrder(id);

    res.status(200).send("The order is successfully deleted.");
  } catch (err) {
    if (err === INVALID_PARAM_ERROR.type)
      res.status(400).send(INVALID_PARAM_ERROR.message(inventryId));
    else res.status(500).send(INVALID_PARAM_ERROR.message());
  }
}

export default deleteOrderById;
