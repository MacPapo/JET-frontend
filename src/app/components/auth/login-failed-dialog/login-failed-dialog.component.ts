import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-failed-dialog',
  templateUrl: './login-failed-dialog.component.html',
  styleUrls: ['./login-failed-dialog.component.css']
})
export class LoginFailedDialogComponent {
  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<LoginFailedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { errorMessage: string }
  ) {
    this.errorMessage = data.errorMessage;
  }
}
