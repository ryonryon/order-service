import { makeUpdateItemSyntax } from "./utils";
import { INVENTORIES } from "../constants";

export const q_createInvntoryTable = (): string =>
  "CREATE TABLE IF NOT EXISTS inventories (inventory_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price INTEGER, quantity_available INTEGER)";

export const q_insertInventoryItem = (
  name: String,
  description: String,
  price: String,
  quantityAvailable: String
): string =>
  `INSERT INTO inventories (name, description, price, quantity_available) VALUES ("${name}", "${description}", ${price}, ${quantityAvailable});`;

export const q_selectInventoryItems = () => `SELECT * FROM inventories;`;

export const q_selectInventoryItem = (id: Number): string => `SELECT * FROM inventories WHERE inventory_id = ${id};`;

export const q_updateInventoryItem = (
  id: number,
  name: string | null,
  description: string | null,
  price: number | null,
  quantityAvailable: number | null
): string => {
  const items = makeUpdateItemSyntax([
    [INVENTORIES.NAME, name],
    [INVENTORIES.DESCRIPTION, description],
    [INVENTORIES.PRICE, price],
    [INVENTORIES.QUANTITY_AVAILABLE, quantityAvailable]
  ]);

  return `UPDATE inventories SET ${items} WHERE inventory_id = ${id};`;
};

export const q_updateInventoryItemQuantiy = (id: number, quantityAvailable: number): string =>
  `UPDATE inventories SET quantity_available = ${quantityAvailable} WHERE inventory_id = ${id};`;

export const q_deleteInventoryItem = (id: Number): string => `DELETE FROM inventories WHERE inventory_id = ${id};`;
