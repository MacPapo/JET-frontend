import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Food from 'src/app/interfaces/food.interface';
import { FormControl, Validators } from '@angular/forms';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent {
  name = new FormControl('', [Validators.required]);
  price = new FormControl(0, [Validators.required, Validators.min(1)]);
  description = new FormControl('', [Validators.required]);
  productionTime = new FormControl(0, [Validators.required, Validators.min(1)]);

  constructor(private foodService: FoodService,
    public dialogRef: MatDialogRef<FoodFormComponent>) {}

  private triggerValidators(): void {
    if (this.name.untouched || this.price.untouched || this.description.untouched || this.productionTime.untouched) {
      this.name.updateValueAndValidity();
      this.price.updateValueAndValidity();
      this.description.updateValueAndValidity();
      this.productionTime.updateValueAndValidity();
    }
    this.name.markAsTouched();
    this.price.markAsTouched();
    this.description.markAsTouched();
    this.productionTime.markAsTouched();
  }

  addFood() {
    if (this.name.invalid || this.price.invalid || this.description.invalid || this.productionTime.invalid) {
      this.triggerValidators();
    } else {
      const food: Food = {
        name: this.name.value!,
        price: this.price.value!,
        description: this.description.value!,
        productionTime: this.productionTime.value!
      };
      this.foodService.addFood(food).subscribe(
        (response: any) => {
          console.log(response);
          this.dialogRef.close();
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
