import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/auth/jwt.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.isAuthenticated()) {
            return true;
        }

        return this.router.parseUrl('/login');
    }

    private isAuthenticated(): boolean {
        if (this.jwtService.isLoggedIn()) {
            return true;
        }

        return false;
    }
}
