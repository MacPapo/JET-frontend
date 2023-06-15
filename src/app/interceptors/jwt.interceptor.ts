import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { JwtService } from '../services/auth/jwt.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private jwtService: JwtService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.jwtService.getLoginData()?.accessToken;
        if (accessToken) {
            request = this.addAuthorizationHeader(request, accessToken);
        }

        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    return this.handleUnauthorizedError(request, next);
                }
                return throwError(error);
            })
        );
    }

    private addAuthorizationHeader(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    private handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.jwtService.refreshToken().pipe(
            switchMap((response) => {
                this.jwtService.setTokens(response.accessToken, response.refreshToken);
                const updatedRequest = this.addAuthorizationHeader(request, response.accessToken);
                return next.handle(updatedRequest);
            }),
            catchError((error: any) => {
                if (this.isRefreshTokenExpiredError(error)) {
                    console.log("DAI CHE ELIMINIAMO IL BRO");
                    this.jwtService.logout();
                }
                return throwError(error);
            })
        );
    }

    private isRefreshTokenExpiredError(error: any): boolean {
        return (error.statusCode === '10001' || error.statusCode === 10001)
            && (error.message === 'RefreshTokenExpired' || error.message === 'jwt expired');
    }
}

export const JwtInterceptorProvider = {
    provide:  HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi:    true,
};
