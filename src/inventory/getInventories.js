import InventoryTable from "../db/InventoryTable";

async function getInventories(_, res) {
  res.send(await InventoryTable.getInventories());
}

export default getInventories;
