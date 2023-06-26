import { FoodBill } from "./order.interface";

export interface Bill {
  _id?: string;
  order: string;
  clients: number;
  table: number;
  totalPrice: number;
  foods: FoodBill[];
  drinks: FoodBill[];
  serviceCharge: number;
}
