import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Order, { FoodOrder, DrinkOrder } from 'src/app/interfaces/order.interface';

export interface GetOrdersResponse {
    statusCode: string;
    message: string;
    data: Order[];
}

export interface GetFoodOrdersResponse {
    statusCode: string;
    message: string;
    data: FoodOrder[];
}

export interface GetDrinkOrdersResponse {
    statusCode: string;
    message: string;
    data: DrinkOrder[];
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl: string = '/api/orders';

    constructor(private http: HttpClient) {}

    apiRole(role: string): string {
        return `${this.apiUrl}/${role}`;
    }

    getOrders(role: string): Observable<GetOrdersResponse> {
        return this.http.get<GetOrdersResponse>(this.apiRole(role));
    }

    getFoodOrders(role: string): Observable<GetFoodOrdersResponse> {
        return this.http.get<GetFoodOrdersResponse>(this.apiRole(role));
    }

    getDrinkOrders(role: string): Observable<GetDrinkOrdersResponse> {
        return this.http.get<GetDrinkOrdersResponse>(`${this.apiUrl}/${role}`);
    }

    getOrder(role: string, id: string): Observable<Order> {
        return this.http.get<Order>(this.apiRole(role) + `/${id}`);
    }

    addOrder(role: string, order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiRole(role), order);
    }

    editOrder(role: string, order: Order): Observable<Order> {
        return this.http.put<Order>(this.apiRole(role) + `/${order._id}`, order);
    }

    deleteOrder(role: string, id: string): Observable<Order> {
        return this.http.delete<Order>(this.apiRole(role) + `/${id}`);
    }
}
