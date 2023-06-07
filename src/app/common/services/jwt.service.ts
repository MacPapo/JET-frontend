import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private apiUrl = '/api';

  constructor(private http: HttpClient, private navbarService: NavbarService) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.apiUrl}/auth/login`;
    return this.http.post(loginUrl, { email, password }).pipe(
      tap((response: any) => {
        const token = response.token;
        this.navbarService.setLogged(true);
        this.saveToken(token);
        this.saveUser(response.userEmail, response.category);
      })
    );
  }

  logout(): void {
    this.clearToken();
    this.clearUser();
    this.navbarService.setLogged(false);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Check if token exists and is not expired
    return token !== null && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserEmail(): string | null {
    return localStorage.getItem("email");
  }

  getUserCategory(): string | null {
    return localStorage.getItem("category");
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private saveUser(email: string, category: string): void {
    localStorage.setItem("email", email);
    localStorage.setItem("category", category);
  }

  private clearToken(): void {
    localStorage.removeItem('token');
  }

  private clearUser(): void {
    localStorage.removeItem("email");
    localStorage.removeItem("category");
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
