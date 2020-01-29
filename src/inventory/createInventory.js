import InventoryTable from "../db/InventoryTable";

async function createInventory(req, res) {
  const name = req.body["name"];
  const description = req.body["description"];
  const price = req.body["price"];
  const quantityAvailable = req.body["quantity_available"];
  try {
    if (typeof name !== "string")
      throw new Error("Name has to be 'string' type.");
    if (typeof description !== "string")
      throw new Error("Description has to be 'string' type.");
    if (typeof price !== "number")
      throw new Error("Price has to be 'number' type.");
    if (typeof quantityAvailable !== "number")
      throw new Error("Quantity available has to be 'number' type.");

    await InventoryTable.createInventory(
      name,
      description,
      price,
      quantityAvailable
    );

    res.status(200).send("Inventory is successfully added.");
  } catch (err) {
    res.status(400).send(`${err}`);
  }
}

export default createInventory;
