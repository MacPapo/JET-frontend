import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Drink from 'src/app/interfaces/drink.interface';

interface GetDrinksResponse {
  statusCode: string;
  message: string;
  data: Drink[];
}

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  private apiUrl = '/api/drinks';

  constructor(private http: HttpClient) {}

  getDrinks(): Observable<GetDrinksResponse> {
    return this.http.get<GetDrinksResponse>(this.apiUrl);
  }

  getDrink(id: string): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${id}`);
  }

  addDrink(drink: Drink): Observable<Drink> {
    return this.http.post<Drink>(this.apiUrl, drink);
  }

  editDrink(drink: Drink): Observable<Drink> {
    return this.http.put<Drink>(`${this.apiUrl}/${drink._id}`, drink);
  }

  deleteDrink(id: string): Observable<Drink> {
    return this.http.delete<Drink>(`${this.apiUrl}/${id}`);
  }
}
