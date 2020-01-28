import InventoryTable from "../db/InventoryTable";

async function deleteInventoryById(req, res) {
  try {
    await InventoryTable.deleteInventry(req.params.id);

    res.status(200).send("Inventory is successfully deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Inventory couldn't be deleted");
  }
}

export default deleteInventoryById;
