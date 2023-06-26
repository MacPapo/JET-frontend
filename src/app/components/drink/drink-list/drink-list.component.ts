import { Component } from '@angular/core';
import Drink from 'src/app/interfaces/drink.interface'
import { DrinkService } from 'src/app/services/drink/drink.service';
import { MatDialog } from '@angular/material/dialog';
import { DrinkFormComponent } from '../drink-form/drink-form.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface GetDrinksResponse {
  statusCode: string;
  message: string;
  data: Drink[];
}

@Component({
  selector: 'app-drink-list',
  providers: [DrinkService],
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent {
  drinks: Drink[] = [];

  constructor(private drinkService: DrinkService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getDrinks();
  }

  private openDrinkDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, drink?: Drink): void {
    const dialogRef = this.dialog.open(DrinkFormComponent, {
      width: '500px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: title,
        drink: drink
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'added' || result == 'updated') {
        this.getDrinks();
      }
    });
  }

  private openConfirmDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, message: string, drink_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title, message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirmed') {
        this.deleteDrink(drink_id);
      }
    });
  }

  private openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe((response: GetDrinksResponse) => {
      this.drinks = response.data;
    });
  }

  addDrink() {
    this.openDrinkDialog('500ms', '500ms', 'Add Drink');
  }

  editDrink(drink: Drink) {
    this.openDrinkDialog('500ms', '500ms', 'Edit Drink', drink);
  }

  deleteDrink(drink_id: string) {
    this.drinkService.deleteDrink(drink_id).subscribe((response: any) => {
      this.getDrinks();
      this.openSnackBar('Drink deleted successfully!', 'Close', 4000);
    },
      (error: any) => {
        console.log(error);
      });
  }

  deleteDrinkDialog(drink_id: string) {
    this.openConfirmDialog('500ms', '500ms', 'Delete Drink', 'Are you sure you want to delete this drink?', drink_id);
  }
}
