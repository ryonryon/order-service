import { CONNECTION_ERROR, INVALID_ITEM_TYPE_ERROR, INVALID_EMAIL_ERROR, INVALID_DATE_ERROR } from '../constants'
import OrderTable from '../db/orderTable'
import { checkType, checkDate, TYPE, checkEmail } from '../validations'

async function createOrder(req, res) {
  const customerEmailAddress = req.body['customer_email_address']
  const dateOrderPlaced = req.body['date_order_placed']
  const orderStatus = req.body['order_status']
  const items = req.body['items']
  console.log(items)

  try {
    checkType(customerEmailAddress, 'customer_email_address', TYPE.STRING)
    checkEmail(customerEmailAddress)
    checkType(dateOrderPlaced, 'date_order_placed', TYPE.STRING)
    checkDate(dateOrderPlaced)
    checkType(orderStatus, 'order_status', TYPE.STRING)

    OrderTable.createOrder(customerEmailAddress, dateOrderPlaced, orderStatus)

    res.status(200).send('The order is successfully added.')
  } catch (err) {
    if (err.error_type === INVALID_ITEM_TYPE_ERROR.type) {
      res.status(400).send(INVALID_ITEM_TYPE_ERROR.message(err.name, err.type))
    } else if (err.error_type === INVALID_EMAIL_ERROR.type) {
      res.status(400).send(INVALID_EMAIL_ERROR.message(err.email))
    } else if (err.error_type === INVALID_DATE_ERROR.type) {
      res.status(400).send(INVALID_DATE_ERROR.message(dateOrderPlaced))
    } else res.status(500).send(CONNECTION_ERROR.message())
  }
}

export default createOrder
