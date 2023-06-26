import { Component, EventEmitter, Output } from '@angular/core';
import Food from 'src/app/interfaces/food.interface';
import { FoodService } from 'src/app/services/food/food.service';

interface GetFoodsResponse {
  statusCode: string;
  message: string;
  data: Food[];
}

interface FoodQuantity extends Food {
  foodQuantity: number;
}

@Component({
  selector: 'app-waiter-food-list',
  templateUrl: './waiter-food-list.component.html',
  styleUrls: ['./waiter-food-list.component.css']
})
export class WaiterFoodListComponent {
  foods: FoodQuantity[] = [];
  @Output() foodsAddedToOrder: EventEmitter<FoodQuantity[]> = new EventEmitter<FoodQuantity[]>();

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this.foodService.getFoods().subscribe((response: GetFoodsResponse) => {
      this.foods = response.data.map((food: Food) => {
        return {
          ...food,
          foodQuantity: 0
        };
      });
    });
  }

  incrementQuantity(food: any) {
    food.foodQuantity++;
    this.addFoodsToOrder();
  }

  decrementQuantity(food: any) {
    if (food.foodQuantity > 0) {
      food.foodQuantity--;
      this.addFoodsToOrder();
    }
  }

  addFoodsToOrder() {
    this.foodsAddedToOrder.emit(this.foods.filter((food: FoodQuantity) => food.foodQuantity > 0));
  }
}
