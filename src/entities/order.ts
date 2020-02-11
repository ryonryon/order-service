import OrderDetail from "./orderDtail";

class Order {
  constructor(
    private _orderId: number,
    private _customEmailAddress: string,
    private _dateOrderPlaced: string,
    private _orderStatus: ORDER_STATUS,
    private _details: OrderDetail[]
  ) {}

  get orderId(): number {
    return this._orderId;
  }

  get customEmailAddress(): string {
    return this._customEmailAddress;
  }

  get dateOrderPlaced(): string {
    return this._dateOrderPlaced;
  }

  get orderStatus(): ORDER_STATUS {
    return this._orderStatus;
  }

  get details(): OrderDetail[] {
    return this._details;
  }

  get orderObject(): Object {
    return {
      order_id: this._orderId,
      customer_email_address: this._customEmailAddress,
      date_order_placed: this._dateOrderPlaced,
      order_status: this._orderStatus,
      details: this._details.map((detail: OrderDetail) => detail.orderDetailObject)
    };
  }
}

export enum ORDER_STATUS {
  ORDERED = "ordered",
  CANCELED = "canceled",
  DELIVERING = "delivering",
  DELIVERED = "delivered"
}

export default Order;
