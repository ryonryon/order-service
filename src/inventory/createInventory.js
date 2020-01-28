import InventoryTable from "../db/InventoryTable";

async function createInventory(req, res) {
  try {
    await InventoryTable.createInventory(
      req.body["name"],
      req.body["description"],
      req.body["price"],
      req.body["quantity_available"]
    );

    res.status(200).send("Inventory is successfully added.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Inventory couldn't be added");
  }
}

export default createInventory;
