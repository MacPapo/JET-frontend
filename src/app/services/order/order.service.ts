import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CacheOrder, Order } from 'src/app/interfaces/order.interface';

export interface GetCacheOrdersResponse {
    statusCode: string;
    message: string;
    data: CacheOrder[];
}

export interface GetOrdersResponse {
    statusCode: string;
    message: string;
    data: Order[];
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl: string = '/api/orders';

    constructor(private http: HttpClient) {}

    apiRole(role: string): string { return `${this.apiUrl}/${role}`; }

    getProductOrders(role: string): Observable<GetCacheOrdersResponse> {
        return this.http.get<GetCacheOrdersResponse>(this.apiRole(role));
    }

    getOrders(role: string): Observable<GetOrdersResponse> {
        return this.http.get<GetOrdersResponse>(this.apiRole(role));
    }

    getOrder(role: string, id: string): Observable<CacheOrder> {
        return this.http.get<CacheOrder>(this.apiRole(role) + `/${id}`);
    }

    getOrderDetail(role: string, id: string): Observable<CacheOrder> {
        return this.http.get<CacheOrder>(this.apiRole(role) + `/detail/${id}`);
    }

    addOrder(role: string, order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiRole(role), order);
    }

    editOrder(role: string, order: CacheOrder): Observable<CacheOrder> {
        return this.http.put<CacheOrder>(this.apiRole(role) + `/${order._id}`, order);
    }

    deleteOrder(role: string, id: string): Observable<CacheOrder> {
        return this.http.delete<CacheOrder>(this.apiRole(role) + `/${id}`);
    }
}
