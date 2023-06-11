import { Component } from '@angular/core';

interface Food {
  name: string;
  price: number;
  description?: string;
  productionTime: number;
}


@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  foods = [{ name: 'Pizza', price: 10 }, { name: 'Burger', price: 5 }, { name: 'Pasta', price: 8 }];

  editFood(food: Food) {
    console.log('Edit food', food);
  }

  deleteFood(food: Food) {
    console.log('Delete food', food);
  }

  addFood() {
    console.log('Add table');
  }
}
