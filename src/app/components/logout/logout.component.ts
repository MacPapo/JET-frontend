import { Component } from '@angular/core';
import { JwtService } from '../../common/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private jwtService: JwtService, private router: Router) {
    this.jwtService.logout();
    this.router.navigate(['login']);
  }

}
