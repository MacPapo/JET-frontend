import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { JwtService } from '../auth/jwt.service';
import Food from 'src/app/interfaces/food.interface';

interface GetFoodsResponse {
  statusCode: string;
  message: string;
  data: Food[];
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = '/api/foods';

  private accessToken = this.jwtService.getLoginData().accessToken;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': env.xApiKey,
    'Authorization': 'Bearer ' + this.accessToken
  });


  constructor(private jwtService: JwtService, private http: HttpClient) {}

  getFoods(): Observable<GetFoodsResponse> {
    return this.http.get<GetFoodsResponse>(this.apiUrl, { headers: this.headers });
  }

  getFood(id: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(this.apiUrl, food, { headers: this.headers });
  }

  editFood(food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.apiUrl}/${food._id}`, food, { headers: this.headers });
  }

  deleteFood(id: string): Observable<Food> {
    return this.http.delete<Food>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
