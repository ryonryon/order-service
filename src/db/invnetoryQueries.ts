import { makeUpdateItemSyntax } from './utils'

export const createInvntoryTable = (): string =>
  'CREATE TABLE IF NOT EXISTS inventories (inventory_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price INTEGER, quantity_available INTEGER)'

export const insertInventoryItem = (
  name: String,
  description: String,
  price: String,
  quantityAvailable: String
): string =>
  `INSERT INTO inventories (name, description, price, quantity_available) VALUES ("${name}", "${description}", ${price}, ${quantityAvailable});`

export const selectInventoryItems = () => `SELECT * FROM inventories;`

export const selectInventoryItem = (id: Number): string => `SELECT * FROM inventories WHERE inventory_id = ${id};`

export const updateInventoryItem = (
  id: Number,
  name: String | null,
  description: String | null,
  price: String | null,
  quantityAvailable: String | null
): string => {
  const items = makeUpdateItemSyntax([
    ['name', name],
    ['description', description],
    ['price', price],
    ['quantity_available', quantityAvailable]
  ])

  return `UPDATE inventories SET ${items} WHERE inventory_id = ${id};`
}

export const deleteInventoryItem = (id: Number): string => `DELETE FROM inventories WHERE inventory_id = ${id};`

export const getInventoryItemAvarability = (name: String, quantity: Number): string =>
  `SELECT count(*) FROM inventories WHERE name = "${name}" AND ${quantity} <= quantity_available;`
