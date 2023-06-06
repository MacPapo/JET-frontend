import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JwtService } from '../../common/services/jwt.service';
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

  constructor(private jwtService: JwtService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.jwtService.login(this.email.value!, this.password.value!).subscribe(
      (response: any) => {
        console.log('Login successful');
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Error logging in:', error);
        // Display an error message to the user or handle the error in an appropriate way
      }
    );
  }
}
