import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JwtService } from '../../../services/auth/jwt.service';
import { NavbarService } from '../../../services/layout/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  hide = true;

  constructor(private jwtService: JwtService,
    private router: Router,
    private navbarService: NavbarService) {}

  ngOnInit() {}

  login() {
    this.jwtService.login(this.email.value!, this.password.value!).subscribe(
      (response: any) => {
        this.navbarService.setLogged(true);
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Error logging in:', error);
        // Display an error message to the user or handle the error in an appropriate way
      }
    );
  }
}
