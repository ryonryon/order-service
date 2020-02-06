class InventoryQuantity {
  readonly inventoryId: number;
  readonly quantity: number;
  readonly newQuantityAvailable: number;

  constructor(inventoryId: number, quantity: number, newQuantityAvailable: number) {
    this.inventoryId = inventoryId;
    this.quantity = quantity;
    this.newQuantityAvailable = newQuantityAvailable;
  }
}
export default InventoryQuantity;
