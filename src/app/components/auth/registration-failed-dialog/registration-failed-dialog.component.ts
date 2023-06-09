import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-failed-dialog',
  templateUrl: './registration-failed-dialog.component.html',
  styleUrls: ['./registration-failed-dialog.component.css']
})
export class RegistrationFailedDialogComponent {
  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<RegistrationFailedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { errorMessage: string }
  ) {
    this.errorMessage = data.errorMessage;
  }
}
