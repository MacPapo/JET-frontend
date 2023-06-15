import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../services/layout/navbar.service';
import { JwtService } from '../../services/auth/jwt.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    isLogged = false;
    isAdmin = false;
    private subscription: Subscription;

    constructor(private navbarService: NavbarService, private jwtService: JwtService) {
        this.subscription = this.navbarService.getLogged().subscribe(value => {
            this.isLogged = value;
            this.isAdmin = this.jwtService.isAdmin();
        });
    }

    ngOnInit() {
        this.jwtService.refreshSubject.subscribe(value => {
            this.isLogged = value;
            this.isAdmin = this.jwtService.isAdmin();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
