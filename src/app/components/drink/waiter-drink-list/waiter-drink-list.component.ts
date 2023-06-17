import { Component, EventEmitter, Output } from '@angular/core';
import Drink from 'src/app/interfaces/drink.interface';
import { DrinkService } from 'src/app/services/drink/drink.service';

interface GetDrinksResponse {
  statusCode: string;
  message: string;
  data: Drink[];
}

interface DrinkQuantity extends Drink {
  drinkQuantity: number;
}


@Component({
  selector: 'app-waiter-drink-list',
  templateUrl: './waiter-drink-list.component.html',
  styleUrls: ['./waiter-drink-list.component.css']
})
export class WaiterDrinkListComponent {
  drinks: DrinkQuantity[] = [];
  @Output() drinksAddedToOrder: EventEmitter<DrinkQuantity[]> = new EventEmitter<DrinkQuantity[]>();

  constructor(private drinkService: DrinkService) {}

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.drinkService.getDrinks().subscribe((response: GetDrinksResponse) => {
      this.drinks = response.data.map((drink: Drink) => {
        return {
          ...drink,
          drinkQuantity: 0
        };
      });
    });
  }

  incrementQuantity(drink: any) {
    drink.drinkQuantity++;
    this.addDrinksToOrder();
  }

  decrementQuantity(drink: any) {
    if (drink.drinkQuantity > 0) {
      drink.drinkQuantity--;
      this.addDrinksToOrder();
    }
  }

  addDrinksToOrder() {
    this.drinksAddedToOrder.emit(this.drinks.filter((drink: DrinkQuantity) => drink.drinkQuantity > 0));
  }
}
