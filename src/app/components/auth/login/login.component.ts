import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JwtService } from '../../../services/auth/jwt.service';
import { Router } from '@angular/router';
import { LoginFailedDialogComponent } from '../login-failed-dialog/login-failed-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit() {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, errorMessage: string): void {
    this.dialog.open(LoginFailedDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { errorMessage }
    });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }


  login() {
    this.jwtService.login(this.email.value!, this.password.value!).subscribe(
      (response: any) => {
        this.authService.setLoggedState(true);
        this.openSnackBar('Login successful!', 'Close', 4000);
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Error logging in:', error);
        this.openDialog('500ms', '500ms', error.error.message);
      }
    );
  }
}
