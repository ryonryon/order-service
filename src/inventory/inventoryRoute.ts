import express from 'express'

import createInventory from './createInventory'
import deleteInventoryById from './deleteInventoryById'
import getInventories from './getInventories'
import getInventoryById from './getInventoryById'
import updateInventoryById from './updateInventoryById'

const InventoryRoute = express.Router()

InventoryRoute.get('/', getInventories)
InventoryRoute.get('/:id', getInventoryById)
InventoryRoute.post('/', createInventory)
InventoryRoute.put('/:id', updateInventoryById)
InventoryRoute.delete('/:id', deleteInventoryById)

export default InventoryRoute
