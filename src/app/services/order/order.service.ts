import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { JwtService } from '../auth/jwt.service';
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

  private accessToken = this.jwtService.getLoginData().accessToken;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': env.xApiKey,
    'Authorization': 'Bearer ' + this.accessToken
  });


  constructor(private jwtService: JwtService, private http: HttpClient) {}

  getOrders(): Observable<GetOrdersResponse> {
    return this.http.get<GetOrdersResponse>(this.apiUrl, { headers: this.headers });
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order, { headers: this.headers });
  }

  editOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${order._id}`, order, { headers: this.headers });
  }

  deleteOrder(id: string): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
