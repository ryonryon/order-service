import OrderTable from "../db/orderTable";
import {
  INVALID_PARAM_ERROR,
  INVALID_ITEM_TYPE_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_DATE_ERROR,
  CONNECTION_ERROR
} from "../constants";
import { checkType, checkDate, TYPE, checkEmail } from "../validations";

async function updateOrderById(req, res) {
  const id = req.params.id;
  const customerEmailAddress = req.body["customer_email_address"];
  const dateOrderPlaced = req.body["data_order_placed"];
  const orderStatus = req.body["order_status"];

  try {
    const order = await OrderTable.getOrder(id);
    if (order === undefined) throw INVALID_PARAM_ERROR.type;

    if (customerEmailAddress !== undefined) {
      checkType(customerEmailAddress, "customer_email_address", TYPE.STRING);
      checkEmail(customerEmailAddress);
    }

    if (dateOrderPlaced !== undefined) {
      checkType(dateOrderPlaced, "data_order_placed", TYPE.STRING);
      checkDate(dateOrderPlaced);
    }

    if (orderStatus !== undefined) {
      checkType(orderStatus, "order_status", TYPE.STRING);
    }

    await OrderTable.updateOrder(
      id,
      customerEmailAddress,
      dateOrderPlaced,
      orderStatus
    );

    res.status(200).send("The order is successfully updated");
  } catch (err) {
    if (err.error_type === INVALID_ITEM_TYPE_ERROR.type)
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type));
    else if (err.error_type === INVALID_EMAIL_ERROR.type)
      res.status(400).send(INVALID_EMAIL_ERROR.message(err.email));
    else if (err.error_type === INVALID_DATE_ERROR.type)
      res.status(400).send(INVALID_DATE_ERROR.message(dateOrderPlaced));
    else res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default updateOrderById;
