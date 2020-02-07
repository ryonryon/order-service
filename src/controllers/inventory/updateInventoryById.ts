import InventoryTable from "../../repositories/inventoryRepository";
import { INVALID_ITEM_TYPE_ERROR, INVALID_INVENTORY_ID_ERROR, CONNECTION_ERROR, INVENTORIES } from "../../constants";
import { checkType, TYPE } from "../../validations";

async function updateInventoryById(req, res) {
  const id = req.params.id;
  const name = req.body[INVENTORIES.NAME];
  const description = req.body[INVENTORIES.DESCRIPTION];
  const price = req.body[INVENTORIES.PRICE];
  const quantityAvailable = req.body[INVENTORIES.QUANTITY_AVAILABLE];
  try {
    if ((await InventoryTable.getInventory(id)) === null) {
      throw INVALID_INVENTORY_ID_ERROR.type;
    }

    checkType(name, INVENTORIES.NAME, TYPE.STRING);
    checkType(description, INVENTORIES.DESCRIPTION, TYPE.STRING);
    checkType(price, INVENTORIES.PRICE, TYPE.NUMBER);
    checkType(quantityAvailable, INVENTORIES.QUANTITY_AVAILABLE, TYPE.NUMBER);

    await InventoryTable.updateInventory(id, name, description, price, quantityAvailable);

    res.send("The inventory is successfully updated");
  } catch (err) {
    if (err === INVALID_INVENTORY_ID_ERROR.type) {
      res.status(400).send(INVALID_INVENTORY_ID_ERROR.message(id));
    } else if (err.error_type === INVALID_ITEM_TYPE_ERROR.type) {
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type));
    } else res.status(400).send(CONNECTION_ERROR.message());
  }
}

export default updateInventoryById;
