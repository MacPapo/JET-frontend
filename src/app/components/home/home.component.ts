import { Component } from '@angular/core';
import { WaiterHomeComponent } from '../waiter/waiter-home/waiter-home.component';
import { CookerHomeComponent } from '../cooker/cooker-home/cooker-home.component';
import { BartenderHomeComponent } from '../bartender/bartender-home/bartender-home.component';
import { CashierHomeComponent } from '../cashier/cashier-home/cashier-home.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  category: string | null;

  constructor() {
    this.category = localStorage.getItem('category');
    console.log(this.category);
  }
}
