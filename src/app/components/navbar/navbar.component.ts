import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { JwtService } from '../../services/auth/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin = false;

  constructor(private authService: AuthService,
    private jwtService: JwtService) {}

  ngOnInit() {
    this.authService.isLogged$.subscribe((res) => {
      this.isLogged = res;
      this.isAdmin = this.jwtService.isAdmin();
    });
  }
}
