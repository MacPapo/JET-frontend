import { Component } from '@angular/core';
import Food from 'src/app/interfaces/food.interface'
import { FoodService } from 'src/app/services/food/food.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodFormComponent } from '../food-form/food-form.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface GetFoodsResponse {
  statusCode: string;
  message: string;
  data: Food[];
}

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  foods: Food[] = [];

  constructor(private foodService: FoodService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getFoods();
  }

  private openFoodDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, food?: Food): void {
    const dialogRef = this.dialog.open(FoodFormComponent, {
      width: '500px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: title,
        food: food
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'added' || result == 'updated') {
        this.getFoods();
      }
    });
  }

  private openConfirmDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, message: string, food_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title, message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirmed') {
        this.deleteFood(food_id);
      }
    });
  }

  private openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }

  getFoods() {
    this.foodService.getFoods().subscribe((response: GetFoodsResponse) => {
      this.foods = response.data;
    });
  }

  addFood() {
    this.openFoodDialog('500ms', '500ms', 'Add Food');
  }

  editFood(food: Food) {
    this.openFoodDialog('500ms', '500ms', 'Edit Food', food);
  }

  deleteFood(food_id: string) {
    this.foodService.deleteFood(food_id).subscribe((response: any) => {
      this.getFoods();
      this.openSnackBar('Food deleted successfully!', 'Close', 4000);
    },
      (error: any) => {
        console.log(error);
      });
  }

  deleteFoodDialog(food_id: string) {
    this.openConfirmDialog('500ms', '500ms', 'Delete Food', 'Are you sure you want to delete this food?', food_id);
  }
}
