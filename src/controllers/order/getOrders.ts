import { Request, Response } from "express";

import OrderTable from "../../repositories/orderRepository";
import { INERNAL_SERVER_ERROR } from "../../constants/errors";
import { ORDERS, ORDERS_DETAIL } from "../../constants/tables";

async function getOrders(_: Request, res: Response) {
  try {
    const _orders = await OrderTable.getOrders();

    const orders: any[] = [];
    let orderId = _orders[0][ORDERS.ORDER_ID];
    let customerEmailAddress = _orders[0][ORDERS.COSUTOMER_EMAIL_ADDRESS];
    let dateOrderPlaced = _orders[0][ORDERS.DATE_ORDER_PLACED];
    let orderStatus = _orders[0][ORDERS.ORDER_STATUS];
    let details: any[] = [];

    _orders.forEach((_order: any) => {
      if (orderId !== _order[ORDERS.ORDER_ID]) {
        orders.push({
          order_id: orderId,
          customer_email_address: customerEmailAddress,
          date_order_placed: dateOrderPlaced,
          order_status: orderStatus,
          details: details
        });

        orderId = _order[ORDERS.ORDER_ID];
        customerEmailAddress = _order[ORDERS.COSUTOMER_EMAIL_ADDRESS];
        dateOrderPlaced = _order[ORDERS.DATE_ORDER_PLACED];
        orderStatus = _order[ORDERS.ORDER_STATUS];
        details = [];
      }

      details.push({
        order_detail_id: _order[ORDERS_DETAIL.ORDER_DETAIL_ID],
        inventory_id: _order[ORDERS_DETAIL.INVNETORY_ID],
        quantity: _order[ORDERS_DETAIL.QUANTITY]
      });
    });

    orders.push({
      order_id: orderId,
      customer_email_address: customerEmailAddress,
      date_order_placed: dateOrderPlaced,
      order_status: orderStatus,
      details: details
    });

    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(INERNAL_SERVER_ERROR.message());
  }
}

export default getOrders;
