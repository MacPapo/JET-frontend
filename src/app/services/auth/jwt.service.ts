import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';

interface LoginResponse {
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: {
      _id: string;
      roles: string[];
    };
  };
}


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private apiUrl = '/api';

  private loginUrl = `${this.apiUrl}/login/basic`;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': env.xApiKey
  });

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(this.loginUrl, { email, password }, { headers: this.headers })
      .pipe(
        tap(response => {
          this.saveLoginData(response['data']['tokens']['accessToken'],
            response['data']['tokens']['refreshToken'],
            response['data']['user']['_id'],
            response['data']['user']['roles']);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
  }

  private saveLoginData(accessToken: string,
    refreshToken: string,
    userId: string,
    roles: string[]): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  private getLoginData(): any {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      userId: localStorage.getItem('userId'),
      roles: JSON.parse(localStorage.getItem('roles') || '[]')
    };
  }

  private isTokenExpired(token: string): boolean {
    // Implement your logic to check if the token is expired
    // For example, you can decode the token and check the expiration date
    // You can use libraries like jwt-decode for decoding JWT tokens
    // Here's a simple example assuming the token has an 'exp' claim:
    const decodedToken: any = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      return expirationDate < new Date();
    }
    return false;
  }

  private decodeToken(token: string): any {
    // Implement your logic to decode the token
    // You can use libraries like jwt-decode for decoding JWT tokens
    // Here's a simple example assuming the token is a base64-encoded JSON:
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
