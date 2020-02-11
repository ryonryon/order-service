class Inventory {
  constructor(
    private _inventoryId: number,
    private _name: string,
    private _description: string,
    private _price: number,
    private _quantityAvailable: number
  ) {}

  get inventoryId(): number {
    return this._inventoryId;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  get quantityAvailable(): number {
    return this._quantityAvailable;
  }

  get inventoryObject(): Object {
    return {
      inventory_id: this._inventoryId,
      name: this._name,
      description: this._description,
      price: this._price,
      quantity_available: this._quantityAvailable
    };
  }
}

export default Inventory;
