import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../../services/auth/register.service';
import { RegistrationFailedDialogComponent } from '../registration-failed-dialog/registration-failed-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  minPasswordLength = 6;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)]);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);
  isAdmin = new FormControl(false);

  constructor(private registerService: RegisterService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, errorMessage: string): void {
    this.dialog.open(RegistrationFailedDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { errorMessage }
    });
  }

  register() {
    var roles: string[] = [this.role.value!];
    console.log(this.isAdmin.value);
    if (this.isAdmin.value == true) roles.push('ADMIN');

    this.registerService.register(this.email.value!,
      this.password.value!,
      this.firstName.value!,
      this.lastName.value!,
      roles)
      .subscribe(
        (response: any) => {
          console.log('Register successful');
          this.router.navigate(['login']);
        },
        (error: any) => {
          this.openDialog('500ms', '500ms', error.error.message);
        }
      );
  }
}
