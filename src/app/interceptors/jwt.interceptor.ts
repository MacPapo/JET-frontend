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
import { environment as env } from '../../environments/environment';
import { JwtService } from '../services/auth/jwt.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private isRefreshing = false;

    constructor(private jwtService: JwtService) {}
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.jwtService.getLoginData()?.accessToken;
        if (accessToken) {
            req = this.addAuthorizationHeader(req, accessToken);
        }

        return next.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handleUnauthorizedError(req, next);
                }
                return throwError(() => error);
            })
        );
    }

    private addAuthorizationHeader(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'x-api-key': env.xApiKey,
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    private handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            if (this.jwtService.isLoggedIn()) {
                return this.jwtService.refreshToken().pipe(
                    switchMap((response) => {
                        this.isRefreshing = false;
                        this.jwtService.setTokens(response.accessToken, response.refreshToken);
                        const updatedRequest = this.addAuthorizationHeader(request, response.accessToken);
                        return next.handle(updatedRequest);
                    }),
                    catchError((error) => {
                        this.isRefreshing = false;

                        if (error.error.statusCode === '10001') {
                            this.jwtService.logout();
                        }
                        
                        return throwError(() => error);
                    })
                );
            }
        }

        return next.handle(request);
    }
}

export const JwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
};
