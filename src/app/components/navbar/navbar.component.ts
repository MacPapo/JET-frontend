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

  constructor(private NavbarService: NavbarService,
    private jwtService: JwtService) {
    this.subscription = NavbarService.getLogged().subscribe(value => {
      this.isLogged = value;
      this.isAdmin = jwtService.getLoginData().roles.includes('ADMIN');
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
