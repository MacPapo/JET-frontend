import { Component } from '@angular/core';
import { JwtService } from 'src/app/services/auth/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  roles: string[];

  constructor(jwtService: JwtService) {
    this.roles = jwtService.getLoginData().roles;
  }
}
