import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { JwtService } from './services/auth/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  isLogged: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private jwtService: JwtService) {
    this.isLogged = this.jwtService.isLoggedIn();
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });
  }
}
