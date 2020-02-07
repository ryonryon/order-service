import {
  CONNECTION_ERROR,
  INVALID_ITEM_TYPE_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_DATE_ERROR,
  INVALID_INVENTORY_ID_ERROR,
  AVAILABLE_QUANTITY_ERROR,
  ORDERS,
  ORDERS_DETAIL,
  INVENTORIES
} from "../../constants";
import OrderTable from "../../repositories/orderRepository";
import { checkType, checkDate, TYPE, checkEmail } from "../../validations";
import InventoryTable from "../../repositories/inventoryRepository";
import InventoryQuantity from "../../entities/inventoryQuantity";

async function createOrder(req, res) {
  const customerEmailAddress = req.body[ORDERS.COSUTOME_EMAIL_ADDRESS];
  const dateOrderPlaced = req.body[ORDERS.DATE_ORDER_PLACED];
  const orderStatus = req.body[ORDERS.ORDER_STATUS];
  const orderItems = req.body["items"];

  try {
    checkType(customerEmailAddress, ORDERS.COSUTOME_EMAIL_ADDRESS, TYPE.STRING);
    checkEmail(customerEmailAddress);
    checkType(dateOrderPlaced, ORDERS.DATE_ORDER_PLACED, TYPE.STRING);
    checkDate(dateOrderPlaced);
    checkType(orderStatus, ORDERS.ORDER_STATUS, TYPE.STRING);

    const orderItemsUpdate: InventoryQuantity[] = [];

    await orderItems.forEach(async orderItem => {
      const [inventoryId, quantity] = [orderItem[ORDERS_DETAIL.INVNETORY_ID], orderItem[ORDERS_DETAIL.QUANTITY]];
      const invenotryItem = await InventoryTable.getInventory(inventoryId);
      if (invenotryItem === null) {
        throw {
          error_type: INVALID_INVENTORY_ID_ERROR.type,
          message: INVALID_DATE_ERROR.message(inventoryId)
        };
      }
      const quantityAvailable = Number(invenotryItem[INVENTORIES.QUANTITY_AVAILABLE]);
      if (quantityAvailable < quantity) {
        throw {
          error_type: AVAILABLE_QUANTITY_ERROR.type,
          message: AVAILABLE_QUANTITY_ERROR.message(inventoryId)
        };
      }

      orderItemsUpdate.push(new InventoryQuantity(inventoryId, quantity, quantityAvailable - quantity));
    });

    await OrderTable.createOrder(customerEmailAddress, dateOrderPlaced, orderStatus, orderItemsUpdate);

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
