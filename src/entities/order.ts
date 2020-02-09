interface Order {
  orderId: number;
  customtomEmailAddress: string;
  dateOrderPlaced: string;
  orderStatus: string;
  details: OrderDetail[];
}

interface OrderDetail {
  orderDetailId: number;
  inventoryId: number;
  quantity: number;
}

export default Order;
