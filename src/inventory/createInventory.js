import InventoryTable from "../db/InventoryTable";
import { CONNECTION_ERROR, VALIDATION_ERROR } from "../constants";

async function createInventory(req, res) {
  const name = req.body["name"];
  const description = req.body["description"];
  const price = req.body["price"];
  const quantityAvailable = req.body["quantity_available"];

  try {
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

    await InventoryTable.createInventory(
      name,
      description,
      price,
      quantityAvailable
    );

    res.status(200).send("Inventory is successfully added.");
  } catch (err) {
    if (err.error_type === VALIDATION_ERROR.type)
      res.status(400).send(VALIDATION_ERROR.message(err.name, err.type));

    res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default createInventory;
