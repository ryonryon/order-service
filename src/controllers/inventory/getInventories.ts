import InventoryTable from "../../repositories/inventoryRepository";
import { CONNECTION_ERROR } from "../../constants";

async function getInventories(_, res) {
  try {
    res.send(await InventoryTable.getInventories());
  } catch (err) {
    res.status(400).send(CONNECTION_ERROR.message());
  }
}

export default getInventories;
