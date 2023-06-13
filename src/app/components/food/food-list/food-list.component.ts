import { Component } from '@angular/core';
import Food from 'src/app/interfaces/food.interface'
import { FoodService } from 'src/app/services/food/food.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodFormComponent } from '../food-form/food-form.component';

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
    private dialog: MatDialog,) {}

  ngOnInit() {
    this.getFoods();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FoodFormComponent, {
      width: '500px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  getFoods() {
    this.foodService.getFoods().subscribe((response: GetFoodsResponse) => {
      this.foods = response.data;
    });
  }

  getFood(id: number) {
    console.log('Get food', id);
  }

  addFood() {
    this.openDialog('500ms', '500ms');
  }

  editFood(food: Food) {
    console.log('Edit food', food);
  }

  deleteFood(food: Food) {
    console.log('Delete food', food);
  }

}