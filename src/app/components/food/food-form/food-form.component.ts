import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Food from 'src/app/interfaces/food.interface';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent {
  newFood: Food = {
    _id: '',
    name: '',
    price: 0,
    description: '',
    productionTime: 0,
  };

  constructor(public dialogRef: MatDialogRef<FoodFormComponent>) {}

  saveFood() {
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
