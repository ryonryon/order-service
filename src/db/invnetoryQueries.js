import { makeUpdateItemSyntax } from "./utils";

export const createInvntoryTable = () =>
  "CREATE TABLE IF NOT EXISTS inventories (inventory_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price INTEGER, quantity_available INTEGER)";

export const insertInventoryItem = (
  name,
  description,
  price,
  quantity_available
) =>
  `INSERT INTO inventories (name, description, price, quantity_available) VALUES ("${name}", "${description}", ${price}, ${quantity_available});`;

export const selectInventoryItems = () => `SELECT * FROM inventories;`;

export const selectInventoryItem = id =>
  `SELECT * FROM inventories WHERE inventory_id = ${id};`;

export const updateInventoryItem = (
  id,
  name,
  description,
  price,
  quantityAvailable
) => {
  if (!name && !description && !price && !quantityAvailable) return null;

  const items = makeUpdateItemSyntax([
    ["name", name],
    ["description", description],
    ["price", price],
    ["quantity_available", quantityAvailable]
  ]);

  return `UPDATE inventories SET ${items} WHERE inventory_id = ${id};`;
};

export const deleteInventoryItem = id =>
  `DELETE FROM inventories WHERE inventory_id = ${id};`;

export const getInventoryItemAvarability = (name, quantity) =>
  `SELECT count(*) FROM inventories WHERE name = "${name}" AND ${quantity} <= quantity_available;`;
