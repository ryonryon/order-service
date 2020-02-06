import InventoryTable from '../db/inventoryTable'
import { INVALID_INVENTORY_ID_ERROR, CONNECTION_ERROR } from '../constants'

async function deleteInventoryById(req, res) {
  const id = req.params.id
  try {
    const inventry = await InventoryTable.getInventory(id)
    if (inventry === null) throw INVALID_INVENTORY_ID_ERROR.type

    await InventoryTable.deleteInventry(id)

    res.status(200).send('The inventory is successfully deleted.')
  } catch (err) {
    if (err === INVALID_INVENTORY_ID_ERROR.type) {
      res.status(400).send(INVALID_INVENTORY_ID_ERROR.message(id))
    } else res.status(500).send(CONNECTION_ERROR.message())
  }
}

export default deleteInventoryById
