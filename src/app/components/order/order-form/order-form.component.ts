import { Component, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  tableNumber = new FormControl('', [Validators.required]);
  waiter = new FormControl('', [Validators.required]);
  foods = new FormControl([]);
  drinks = new FormControl([]);
  status = new FormControl('PENDING', [Validators.required]);

  constructor() {}

  addOrder() {
    console.log('Order added!');
  }

}
