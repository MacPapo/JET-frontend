import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import Food from 'src/app/interfaces/food.interface';
import { FormControl, Validators } from '@angular/forms';
import { FoodService } from 'src/app/services/food/food.service';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  buttonText = 'Add';
  editMode = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, food?: Food },
    private foodService: FoodService,
    public dialogRef: MatDialogRef<FoodFormComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    if (data.food) {
      this.name.setValue(data.food.name);
      this.price.setValue(data.food.price);
      this.description.setValue(data.food.description || '');
      this.productionTime.setValue(data.food.productionTime);
      this.buttonText = 'Update';
      this.editMode = true;
    }
  }

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

  private openDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title, errorMessage }
    });
  }

  private openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
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

      if (this.editMode) {
        this.updateFood(food);
      } else {

        this.foodService.addFood(food).subscribe(
          (response: any) => {
            console.log(response);
            this.dialogRef.close('added');
            this.openSnackBar('Food created successfully!', 'Close', 4000);
          },
          (error: any) => {
            this.openDialog('500ms', '500ms', 'Food not added', error.error.message);
          }
        );

      }
    }
  }

  private updateFood(food: Food) {
    food._id = this.data.food!._id;
    this.foodService.editFood(food).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close('updated');
        this.openSnackBar('Food updated successfully!', 'Close', 4000);
      },
      (error: any) => {
        console.log(error);
        this.openDialog('500ms', '500ms', 'Food not updated', error.error.message);
      }
    );
  }


  cancel() {
    this.dialogRef.close('cancel');
  }
}
