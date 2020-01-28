// inventory
export const createInvntoryTable = () =>
  `
  CREATE TABLE IF NOT EXISTS inventory 
    (
      inventory_id INTEGER PRIMARY KEY AUTOINCREMENT
      , name TEXT
      , description TEXT
      , price INTEGER
      , quantity_available INTEGER
    )
  `;

export const insertInventoryItem = (
  name,
  description,
  price,
  quantity_available
) =>
  `INSERT INTO inventory (name, description, price, quantity_available) VALUES ("${name}", "${description}", ${price}, ${quantity_available})`;

export const selectInventoryItems = () => `SELECT * FROM inventory`;

export const selectInventoryItem = id =>
  `SELECT * FROM inventory WHERE inventory_id = ${id}`;

export const updateInventoryItem = (
  id,
  name,
  description,
  price,
  quantity_available
) => {
  if (!name && !description && !price && !quantity_available) return null;

  const items = makeUpdateItemSyntax([
    ["name", name],
    ["description", description],
    ["price", price],
    ["quantity_available", quantity_available]
  ]);

  return `UPDATE inventory SET ${items} WHERE inventory_id = ${id}`;
};

export const deleteInventoryItem = id =>
  `DELETE FROM inventory WHERE inventory_id = ${id}`;

export const getInventoryItemAvarability = (name, quantity) =>
  `SELECT count(*) FROM inventory WHERE name = "${name}" AND "${quantity}" <= quantity_available`;
