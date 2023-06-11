import { Component } from '@angular/core';

interface Drink {
  name: string;
  price: number;
  description?: string;
  productionTime: number;
}

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent {
  drinks = [{ name: 'Coca-Cola', price: 2.5 }, { name: 'Fanta', price: 2.5 }, { name: 'Sprite', price: 2.5 }];

  editDrink(drink: Drink) {
    console.log('Edit drink', drink);
  }

  deleteDrink(drink: Drink) {
    console.log('Delete drink', drink);
  }

  addDrink() {
    console.log('Add table');
  }
}
