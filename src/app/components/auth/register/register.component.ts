import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../../services/auth/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  isAdmin = new FormControl(false);

  constructor(private registerService: RegisterService, private router: Router) {}

  ngOnInit() {}

  register() {
    this.registerService.register(this.email.value!,
      this.password.value!,
      this.firstName.value!,
      this.lastName.value!,
      this.category.value!,
      this.isAdmin.value!)
      .subscribe(
        (response: any) => {
          console.log('Register successful');
          this.router.navigate(['login']);
        },
        (error: any) => {
          console.log('Register error');
        });
  }
}
