import { OrderStatus } from './order-status.enum';

interface Product {
    _id: string;
    quantity: number;
}

export interface Consumable {
    _id: string;
    name: string;
    productionTime: number;
}

export interface ConsumableProduct {
    _id: Consumable;
    quantity: number;
}

export interface Waiter {
    _id: string;
    firstName: string;
    lastName: string;
}

export interface FoodOrder {
    _id: string,
    table: number,
    waiter: Waiter,
    foods: Array<ConsumableProduct>,
    updatedAt: Date,
    createdAt: Date,
}

export interface DrinkOrder {
    _id: string,
    table: number,
    waiter: Waiter,
    drinks: Array<ConsumableProduct>,
    updatedAt: Date,
    createdAt: Date,
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
