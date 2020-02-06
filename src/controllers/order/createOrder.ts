import {
  CONNECTION_ERROR,
  INVALID_ITEM_TYPE_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_DATE_ERROR,
  INVALID_INVENTORY_ID_ERROR,
  AVAILABLE_QUANTITY_ERROR
} from "../../constants";
import OrderTable from "../../repositories/orderRepository";
import { checkType, checkDate, TYPE, checkEmail } from "../../validations";
import InventoryTable from "../../repositories/inventoryRepository";
import InventoryQuantity from "../../entities/inventoryQuantity";

async function createOrder(req, res) {
  const customerEmailAddress = req.body["customer_email_address"];
  const dateOrderPlaced = req.body["date_order_placed"];
  const orderStatus = req.body["order_status"];
  const orderItems = req.body["items"];

  try {
    checkType(customerEmailAddress, "customer_email_address", TYPE.STRING);
    checkEmail(customerEmailAddress);
    checkType(dateOrderPlaced, "date_order_placed", TYPE.STRING);
    checkDate(dateOrderPlaced);
    checkType(orderStatus, "order_status", TYPE.STRING);

    const orderItemsUpdate: InventoryQuantity[] = [];

    await orderItems.forEach(async orderItem => {
      const [inventoryId, quantity] = [orderItem["inventory_id"], orderItem["quantity"]];
      const invenotryItem = await InventoryTable.getInventory(inventoryId);
      if (invenotryItem === null) {
        throw {
          error_type: INVALID_INVENTORY_ID_ERROR.type,
          message: INVALID_DATE_ERROR.message(inventoryId)
        };
      }
      const quantityAvailable = Number(invenotryItem["quantity_available"]);
      if (quantityAvailable < quantity) {
        throw {
          error_type: AVAILABLE_QUANTITY_ERROR.type,
          message: AVAILABLE_QUANTITY_ERROR.message(inventoryId)
        };
      }

      orderItemsUpdate.push(new InventoryQuantity(inventoryId, quantity, quantityAvailable - quantity));
    });

    OrderTable.createOrder(customerEmailAddress, dateOrderPlaced, orderStatus, orderItemsUpdate);

    res.status(200).send("The order is successfully added.");
  } catch (err) {
    if (err.error_type === INVALID_ITEM_TYPE_ERROR.type) {
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type));
    } else if (err.error_type === INVALID_EMAIL_ERROR.type) {
      res.status(400).send(INVALID_EMAIL_ERROR.message(err.email));
    } else if (err.error_type === INVALID_DATE_ERROR.type) {
      res.status(400).send(INVALID_DATE_ERROR.message(dateOrderPlaced));
    } else if (err.error_type === INVALID_INVENTORY_ID_ERROR.type) {
      res.status(400).send(err.message());
    } else if (err.error_type === AVAILABLE_QUANTITY_ERROR.type) {
      res.status(400).send(err.message());
    } else res.status(500).send(CONNECTION_ERROR.message());
  }
}

export default createOrder;
