import { Component } from '@angular/core';
import Food from 'src/app/interfaces/food.interface';
import { FoodService } from 'src/app/services/food/food.service';

interface GetFoodsResponse {
  statusCode: string;
  message: string;
  data: Food[];
}


@Component({
  selector: 'app-waiter-food-list',
  templateUrl: './waiter-food-list.component.html',
  styleUrls: ['./waiter-food-list.component.css']
})
export class WaiterFoodListComponent {
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
}
