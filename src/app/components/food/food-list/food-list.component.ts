import { Component } from '@angular/core';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  foods = [{ name: 'Pizza', price: 10 }, { name: 'Burger', price: 5 }, { name: 'Pasta', price: 8 }];
}
