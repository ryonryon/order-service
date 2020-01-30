import InventoryTable from "../db/InventoryTable";
import { INVALID_PARAM_ERROR } from "../constants";

async function getInventoryById(req, res) {
  const inventryId = req.params.id;
  try {
    const inventry = await InventoryTable.getInventory(inventryId);
    if (inventry === undefined) throw INVALID_PARAM_ERROR.type;

    res.status(200).send(inventry);
  } catch (err) {
    if (err === INVALID_PARAM_ERROR.type)
      res.status(400).send(INVALID_PARAM_ERROR.message(inventryId));

    res.status(500).send(INVALID_PARAM_ERROR.message());
  }
}

export default getInventoryById;
