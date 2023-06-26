import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = '/api/auth';

  private registerUrl = `${this.apiUrl}/register/`;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': env.xApiKey
  });

  constructor(private http: HttpClient) {}

  register(email: string, password: string, firstName: string, lastName: string, roles: string[]): Observable<any> {
    return this.http.post(this.registerUrl, { firstName, lastName, email, password, roles }, { headers: this.headers });
  }
}
