import InventoryTable from "../db/InventoryTable";

async function deleteInventoryById(req, res) {
  const inventoryId = req.params.id;
  try {
    const inventry = await InventoryTable.getInventory(inventryId);
    if (inventry === undefined) throw INVALID_PARAM_ERROR.type;

    await InventoryTable.deleteInventry(inventoryId);

    res.status(200).send("Inventory is successfully deleted.");
  } catch (err) {
    if (err === INVALID_PARAM_ERROR.type)
      res.status(400).send(INVALID_PARAM_ERROR.message(inventryId));

    res.status(500).send(INVALID_PARAM_ERROR.message());
  }
}

export default deleteInventoryById;
