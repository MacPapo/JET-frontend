import { OrderStatus } from './order-status.enum';

export default interface Order {
  _id?: string,
  table: string,
  waiter: string,
  foods?: Array<string>,
  drinks?: Array<string>,
  status: OrderStatus
}
