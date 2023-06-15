import { Component } from '@angular/core';
import { OrderFormComponent } from '../../order/order-form/order-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-waiter-home',
  templateUrl: './waiter-home.component.html',
  styleUrls: ['./waiter-home.component.css']
})
export class WaiterHomeComponent {

  constructor(public dialog: MatDialog) {}

  private openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '80%',
      height: '70%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {}
    });
  }

  addOrder() {
    this.openDialog('500ms', '500ms');
  }
}
