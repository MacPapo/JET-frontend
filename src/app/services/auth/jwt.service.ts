import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import jwt_decode from 'jwt-decode';

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

  private refreshTokenHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': env.xApiKey,
    'Authorization': `Bearer ${this.getLoginData().accessToken}`
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

  refreshToken(): Observable<any> {
    return this.http.post<RefreshTokenResponse>(this.refreshTokenUrl, { refreshToken: this.getLoginData().refreshToken }, { headers: this.refreshTokenHeaders })
      .pipe(
        tap(response => {
          this.setTokens(response['accessToken'], response['refreshToken']);
        }, error => {
          console.log(error.error.message);
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
    roles: Role[]): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);

    const roleCodes = roles.map(role => role['code']);

    localStorage.setItem('roles', JSON.stringify(roleCodes));
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.removeItem('accessToken');

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
    if (!loginData) {
      console.log("no login data");
      return false;
    }
    if (!loginData.refreshToken) {
      console.log("no refresh token");
      return false;
    }
    if (!loginData.accessToken) {
      console.log("no access token");
      return false;
    }
    if (this.isTokenExpired(loginData.accessToken)) {
      this.refreshToken()
        .subscribe(
          response => {
            return true;
          },
          error => {
            return false;
          }
        );
    }
    return true;
  }

  isAdmin(): boolean {
    const loginData = this.getLoginData();
    if (loginData.roles) {
      return loginData.roles.includes('ADMIN');
    }
    return false;
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
      console.log("expired " + (expireDate < currentDate));
      return expireDate < currentDate;
    }
    return true;
  }
}
