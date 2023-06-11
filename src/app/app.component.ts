import { Component } from '@angular/core';
import { JwtService } from './services/auth/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  private jwtService: JwtService;
  private router: Router;

  constructor(jwtService: JwtService, router: Router) {
    this.jwtService = jwtService;
    this.router = router;
  }

  ngOnInit() {
    if (!this.jwtService.isLoggedIn()) {
      console.log('Not logged in');
      this.router.navigate(['login']);
    }
  }
}
