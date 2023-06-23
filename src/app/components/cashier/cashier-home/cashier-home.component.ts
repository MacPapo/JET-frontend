import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BillFormComponent } from '../../bills/bill-form/bill-form.component';

@Component({
  selector: 'app-cashier-home',
  templateUrl: './cashier-home.component.html',
  styleUrls: ['./cashier-home.component.css']
})
export class CashierHomeComponent {

  constructor(public dialog: MatDialog) {}

  private openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(BillFormComponent, {
      width: '80%',
      height: '70%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {}
    });
  }

  addBill() {
    this.openDialog('500ms', '500ms');
  }
}
