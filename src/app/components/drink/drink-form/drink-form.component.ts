import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import Drink from 'src/app/interfaces/drink.interface';
import { FormControl, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DrinkService } from 'src/app/services/drink/drink.service';

@Component({
  selector: 'app-drink-form',
  templateUrl: './drink-form.component.html',
  styleUrls: ['./drink-form.component.css']
})
export class DrinkFormComponent {
  name = new FormControl('', [Validators.required]);
  price = new FormControl(0, [Validators.required, Validators.min(1)]);
  description = new FormControl('', [Validators.required]);
  productionTime = new FormControl(0, [Validators.required, Validators.min(1)]);

  buttonText = 'Add';
  editMode = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, drink?: Drink },
    private drinkService: DrinkService,
    public dialogRef: MatDialogRef<DrinkFormComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    if (data.drink) {
      this.name.setValue(data.drink.name);
      this.price.setValue(data.drink.price);
      this.description.setValue(data.drink.description || '');
      this.productionTime.setValue(data.drink.productionTime);
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

  addDrink() {
    if (this.name.invalid || this.price.invalid || this.description.invalid || this.productionTime.invalid) {
      this.triggerValidators();
    } else {

      const drink: Drink = {
        name: this.name.value!,
        price: this.price.value!,
        description: this.description.value!,
        productionTime: this.productionTime.value!
      };

      if (this.editMode) {
        this.updateDrink(drink);
      } else {

        this.drinkService.addDrink(drink).subscribe(
          (response: any) => {
            console.log(response);
            this.dialogRef.close('added');
            this.openSnackBar('Drink created successfully!', 'Close', 4000);
          },
          (error: any) => {
            this.openDialog('500ms', '500ms', 'Drink not added', error.error.message);
          }
        );

      }
    }
  }

  private updateDrink(drink: Drink) {
    drink._id = this.data.drink!._id;
    console.log(drink);
    this.drinkService.editDrink(drink).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close('updated');
        this.openSnackBar('Drink updated successfully!', 'Close', 4000);
      },
      (error: any) => {
        console.log(error);
        this.openDialog('500ms', '500ms', 'Drink not updated', error.error.message);
      }
    );
  }


  cancel() {
    this.dialogRef.close('cancel');
  }
}
