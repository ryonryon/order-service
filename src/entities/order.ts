import OrderDetail from "./orderDtail";

interface Order {
  orderId: number;
  customtomEmailAddress: string;
  dateOrderPlaced: string;
  orderStatus: ORDER_STATUS;
  details: OrderDetail[];
}

export enum ORDER_STATUS {
  ORDERED = "ordered",
  CANCELED = "canceled",
  DELIVERING = "delivering",
  DELIVERED = "delivered"
}

export default Order;
