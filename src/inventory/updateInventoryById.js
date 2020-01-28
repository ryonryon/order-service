import InventoryTable from "../db/InventoryTable";

async function updateInventoryById(req, res) {
  await InventoryTable.updateInventory(
    req.params.id,
    req.body["name"],
    req.body["description"],
    req.body["price"],
    req.body["quantity_available"]
  );
  res.send({ test: `${req.method} is working` });
}

export default updateInventoryById;
