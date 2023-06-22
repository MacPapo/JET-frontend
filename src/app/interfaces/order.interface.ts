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

export interface ProductOrdered {
    _id: string;
    quantity: number;
}

export interface CacheProductOrdered {
    _id: string;
    name: string;
    productionTime: number;
    description?: string;
    price: number;
    quantity: number;
    checked: boolean;
}

export interface Order {
    _id: string;
    clients: number;
    table: number;
    waiter: string;
    foods: ProductOrdered[];
    drinks: ProductOrdered[];
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CacheOrder {
    _id: string;
    clients: number;
    table: number;
    waiter: string;
    foods: CacheProductOrdered[];
    drinks: CacheProductOrdered[];
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    checkedFoods: boolean;
    checkedDrinks: boolean;
}
