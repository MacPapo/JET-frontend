import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  getFoods(): Observable<GetFoodsResponse> {
    return this.http.get<GetFoodsResponse>(this.apiUrl);
  }

  getFood(id: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`);
  }

  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(this.apiUrl, food);
  }

  editFood(food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.apiUrl}/${food._id}`, food);
  }

  deleteFood(id: string): Observable<Food> {
    return this.http.delete<Food>(`${this.apiUrl}/${id}`);
  }
}
