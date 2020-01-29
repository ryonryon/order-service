import InventoryTable from "../db/InventoryTable";

async function deleteInventoryById(req, res) {
  const inventoryId = req.params.id;
  try {
    if (undefined === (await InventoryTable.getInventory(inventoryId)))
      throw new Error(`Inventory Id: ${inventoryId} doesn't exist.`);

    await InventoryTable.deleteInventry(inventoryId);

    res.status(200).send("Inventory is successfully deleted.");
  } catch (err) {
    console.error(err);
    res.status(400).send(`${err}`);
  }
}

export default deleteInventoryById;
