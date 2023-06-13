import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { JwtService } from '../auth/jwt.service';
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

  private accessToken = this.jwtService.getLoginData().accessToken;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': env.xApiKey,
    'Authorization': 'Bearer ' + this.accessToken
  });


  constructor(private jwtService: JwtService, private http: HttpClient) {}

  getDrinks(): Observable<GetDrinksResponse> {
    return this.http.get<GetDrinksResponse>(this.apiUrl, { headers: this.headers });
  }

  getDrink(id: string): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  addDrink(drink: Drink): Observable<Drink> {
    return this.http.post<Drink>(this.apiUrl, drink, { headers: this.headers });
  }

  editDrink(drink: Drink): Observable<Drink> {
    return this.http.put<Drink>(`${this.apiUrl}/${drink._id}`, drink, { headers: this.headers });
  }

  deleteDrink(id: string): Observable<Drink> {
    return this.http.delete<Drink>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
