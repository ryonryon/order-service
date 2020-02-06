import InventoryTable from "../db/InventoryTable";

async function deleteInventoryById(req, res) {
  const id = req.params.id;
  try {
    const inventry = await InventoryTable.getInventory(id);
    if (inventry === undefined) throw INVALID_PARAM_ERROR.type;

    await InventoryTable.deleteInventry(id);

    res.status(200).send("Inventory is successfully deleted.");
  } catch (err) {
    if (err === INVALID_PARAM_ERROR.type)
      res.status(400).send(INVALID_PARAM_ERROR.message(inventryId));
    else res.status(500).send(INVALID_PARAM_ERROR.message());
  }
}

export default deleteInventoryById;
