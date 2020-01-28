import InventoryTable from "../db/InventoryTable";

async function getInventoryById(req, res) {
  res.send(await InventoryTable.getInventory(req.params.id));
}

export default getInventoryById;
