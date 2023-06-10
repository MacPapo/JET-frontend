import { Component } from '@angular/core';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent {
  drinks = [{ name: 'Coca-Cola', price: 2.5 }, { name: 'Fanta', price: 2.5 }, { name: 'Sprite', price: 2.5 }];
}
