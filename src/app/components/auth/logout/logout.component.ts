
import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../../services/auth/jwt.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.authService.setLoggedState(false);
    this.jwtService.logout();
  }
}
