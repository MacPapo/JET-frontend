import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Order from 'src/app/interfaces/order.interface';

interface GetOrdersResponse {
  statusCode: string;
  message: string;
  data: Order[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<GetOrdersResponse> {
    return this.http.get<GetOrdersResponse>(this.apiUrl);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  editOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${order._id}`, order);
  }

  deleteOrder(id: string): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrl}/${id}`);
  }
}
