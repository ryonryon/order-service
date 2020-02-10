import { makeSyntaxAndParams } from "./utils";
import { INVENTORIES } from "../constants";

export const qCreateInvntoryTable =
  "CREATE TABLE IF NOT EXISTS inventories (inventory_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price INTEGER, quantity_available INTEGER)";

export const qInsertInventoryItem = `INSERT INTO inventories (name, description, price, quantity_available) VALUES (?, ?, ?, ?);`;

export const qSelectInventoryItems = `SELECT * FROM inventories;`;

export const qSelectInventoryItem = `SELECT * FROM inventories WHERE inventory_id = ?;`;

export const qUpdateInventoryItem = (
  id: number,
  name: string | null,
  description: string | null,
  price: number | null,
  quantityAvailable: number | null
): [string, any[]] => {
  const [syntax, params] = makeSyntaxAndParams(id, [
    [INVENTORIES.NAME, name],
    [INVENTORIES.DESCRIPTION, description],
    [INVENTORIES.PRICE, price],
    [INVENTORIES.QUANTITY_AVAILABLE, quantityAvailable]
  ]);

  return [`UPDATE inventories SET ${syntax} WHERE inventory_id = ?;`, params];
};

export const qUpdateInventoryItemQuantiy = (id: number, quantityAvailable: number): string =>
  `UPDATE inventories SET quantity_available = ${quantityAvailable} WHERE inventory_id = ${id};`;

export const qDeleteInventoryItem = `DELETE FROM inventories WHERE inventory_id = ?;`;
