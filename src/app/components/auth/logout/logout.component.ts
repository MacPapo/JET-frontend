
import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../../services/auth/jwt.service';
import { Router } from '@angular/router';
import { NavbarService } from '../../../services/layout/navbar.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(
        private jwtService: JwtService,
        private router: Router,
        private navbarService: NavbarService
    ) {}

    ngOnInit(): void {
        this.logout();
    }

    logout(): void {
        this.jwtService.logout();
        this.navbarService.setLogged(false);
        this.router.navigate(['login']);
    }
}
