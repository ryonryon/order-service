import InventoryTable from "../db/InventoryTable";
import { CONNECTION_ERROR, INVALID_PARAM_ERROR } from "../constants";

async function updateInventoryById(req, res) {
  const inventoryId = req.params.id;
  const name = req.body["name"];
  const description = req.body["description"];
  const price = req.body["price"];
  const quantityAvailable = req.body["quantity_available"];
  try {
    if (undefined === (await InventoryTable.getInventory(inventoryId)))
      throw INVALID_PARAM_ERROR.type;

    if (typeof name !== "string")
      throw { error_type: VALIDATION_ERROR.type, name: "name", type: "string" };
    if (typeof description !== "string")
      throw {
        error_type: VALIDATION_ERROR.type,
        name: "description",
        type: "string"
      };
    if (typeof price !== "number")
      throw {
        error_type: VALIDATION_ERROR.type,
        name: "price",
        type: "number"
      };
    if (typeof quantityAvailable !== "number")
      throw {
        error_type: VALIDATION_ERROR.type,
        name: "quantity_available",
        type: "number"
      };

    await InventoryTable.updateInventory(
      inventoryId,
      name,
      description,
      price,
      quantityAvailable
    );
    res.send("The inventory is successfully updated");
  } catch (err) {
    if (err === INVALID_PARAM_ERROR.type)
      res.status(400).send(INVALID_PARAM_ERROR.message(inventoryId));

    if (err.error_type === VALIDATION_ERROR.type)
      res.status(400).send(VALIDATION_ERROR.message(err.name, err.type));

    res.status(400).send(CONNECTION_ERROR.message());
  }
}

export default updateInventoryById;
