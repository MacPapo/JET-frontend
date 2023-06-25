import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

interface Role {
  _id: string;
  code: string;
}

interface LoginResponse {
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: {
      _id: string;
      roles: Role[];
    };
  };
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private apiUrl = '/api/auth';

  private loginUrl = `${this.apiUrl}/login`;
  private refreshTokenUrl = `${this.apiUrl}/token/refresh`;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': env.xApiKey
  });

  refreshSubject = new BehaviorSubject<boolean>(false);
  private refreshingToken = false;

  constructor(private http: HttpClient,
    private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<LoginResponse>(this.loginUrl,
        { email, password },
        { headers: this.headers })
      .pipe(
        tap(response => {
          this.saveLoginData(
            response.data.tokens.accessToken,
            response.data.tokens.refreshToken,
            response.data.user._id,
            response.data.user.roles
          );
        })
      );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getLoginData().refreshToken;
    return this.http
      .post<RefreshTokenResponse>(
        this.refreshTokenUrl,
        { refreshToken },
        { headers: this.headers }
      )
      .pipe(
        tap(
          response => {
            this.setTokens(response.accessToken, response.refreshToken);
            this.refreshSubject.next(true);
          },
          error => {
            console.log(error.error.message);
            console.log('refresh token error');
          }
        )
      );
  }

  private saveLoginData(
    accessToken: string,
    refreshToken: string,
    userId: string,
    roles: Role[]
  ): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);

    const roleCodes = roles.map(role => role.code);

    localStorage.setItem('roles', JSON.stringify(roleCodes));
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getLoginData(): any {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      userId: localStorage.getItem('userId'),
      roles: JSON.parse(localStorage.getItem('roles') || '[]')
    };
  }


  isLoggedIn(): boolean {
    const loginData = this.getLoginData();

    if (!loginData || !loginData.refreshToken || !loginData.accessToken) {
      return false;
    }

    return true;
  }



  isAdmin(): boolean {
    const loginData = this.getLoginData();
    return loginData.roles && loginData.roles.includes('ADMIN');
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.getDecodedAccessToken(token);
    if (decodedToken) {
      const expireDate = new Date(decodedToken.exp * 1000).getDate();
      const currentDate = new Date().getDate();
      return expireDate < currentDate;
    }
    return true;
  }
}
