import { Component } from '@angular/core';
import Food from 'src/app/interfaces/food.interface'
import { FoodService } from 'src/app/services/food/food.service';

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

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.getFoods();
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
    console.log('Add food');
  }

  editFood(food: Food) {
    console.log('Edit food', food);
  }

  deleteFood(food: Food) {
    console.log('Delete food', food);
  }

}
