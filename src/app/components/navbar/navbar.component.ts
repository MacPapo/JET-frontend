import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { JwtService } from '../../services/auth/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLogged: boolean;
  isAdmin = false;

  constructor(private authService: AuthService,
    private jwtService: JwtService) {
    this.subscribe();
    this.isLogged = this.jwtService.isLoggedIn();
    this.isAdmin = this.jwtService.isAdmin();
  }

  private subscribe() {
    this.authService.isLogged$.subscribe((res) => {
      this.isLogged = res;
      this.isAdmin = this.jwtService.isAdmin();
    });
  }
}
