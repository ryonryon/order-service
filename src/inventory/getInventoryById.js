import InventoryTable from "../db/InventoryTable";

async function getInventoryById(req, res) {
  const inventryId = req.params.id;
  try {
    const inventry = await InventoryTable.getInventory(inventryId);
    if (inventry === undefined)
      throw new Error(`inventry id: ${inventryId} doesn't exist.`);
    res.send(inventry);
  } catch (err) {
    res.send(`${err}`);
  }
}

export default getInventoryById;
