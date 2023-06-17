import { OrderStatus } from './order-status.enum';

interface Product {
  _id: string;
  quantity: number;
}

export default interface Order {
  _id?: string,
  clients: number,
  table: number,
  waiter: string,
  foods?: Array<Product>,
  drinks?: Array<Product>,
  status?: OrderStatus
}
