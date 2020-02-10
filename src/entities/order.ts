import OrderDetail from "./orderDtail";

interface Order {
  orderId: number;
  customtomEmailAddress: string;
  dateOrderPlaced: string;
  orderStatus: string;
  details: OrderDetail[];
}
export default Order;
