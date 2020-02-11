class OrderDetail {
  constructor(
    private _orderDetailId: number,
    private _orderId: number,
    private _inventoryId: number,
    private _quantity: number
  ) {}

  get orderDetailId(): number {
    return this._orderDetailId;
  }

  get orderId(): number {
    return this._orderId;
  }

  get inventoryId(): number {
    return this._inventoryId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get orderDetailObject(): Object {
    return {
      order_detail_id: this._orderDetailId,
      order_id: this._orderId,
      inventry_id: this._inventoryId,
      quantity: this._quantity
    };
  }
}

export default OrderDetail;
