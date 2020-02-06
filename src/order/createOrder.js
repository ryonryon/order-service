import {
  CONNECTION_ERROR,
  INVALID_ITEM_TYPE_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_DATE_ERROR
} from "../constants";
import OrderTable from "../db/orderTable";
import { checkDate, TYPE, checkEmail } from "../validations";

async function createOrder(req, res) {
  const customerEmailAddress = req.body["customer_email_address"];
  const dateOrderPlaced = req.body["data_order_placed"];
  const orderStatus = req.body["order_status"];

  try {
    checkDate(customerEmailAddress, "customer_email_address", TYPE.STRING);
    checkEmail(customerEmailAddress);
    checkDate(dateOrderPlaced, "data_order_placed", TYPE.STRING);
    checkDate(dateOrderPlaced);
    checkDate(orderStatus, "order_status", TYPE.STRING);

    await OrderTable.createOrder(
      customerEmailAddress,
      dateOrderPlaced,
      orderStatus
    );
    res.status(200).send("Order is successfully added.");
  } catch (err) {
    if (err.error_type === INVALID_ITEM_TYPE_ERROR.type)
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type));
    else if (err.error_type === INVALID_EMAIL_ERROR.type)
      res.status(400).send(INVALID_EMAIL_ERROR.message(err.email));
    else if (err.error_type === INVALID_DATE_ERROR.type)
      res.status(400).send(INVALID_DATE_ERROR.message(dateOrderPlaced));
    else res.status(400).send(CONNECTION_ERROR.message());
  }
}

export default createOrder;
