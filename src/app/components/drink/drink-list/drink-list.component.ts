import { Component } from '@angular/core';
import Drink from 'src/app/interfaces/drink.interface'
import { DrinkService } from 'src/app/services/drink/drink.service';
import { MatDialog } from '@angular/material/dialog';
import { DrinkFormComponent } from '../drink-form/drink-form.component';

interface GetDrinksResponse {
  statusCode: string;
  message: string;
  data: Drink[];
}

@Component({
  selector: 'app-drink-list',
  providers: [DrinkService],
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent {
  drinks: Drink[] = [];

  constructor(private drinkService: DrinkService,
    private dialog: MatDialog,) {}

  ngOnInit() {
    this.getDrinks();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DrinkFormComponent, {
      width: '500px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  getDrinks() {
    this.drinkService.getDrinks().subscribe((response: GetDrinksResponse) => {
      this.drinks = response.data;
    });
  }

  getDrink(id: number) {
    console.log('Get drink', id);
  }

  addDrink() {
    this.openDialog('500ms', '500ms');
  }

  editDrink(drink: Drink) {
    console.log('Edit drink', drink);
  }

  deleteDrink(drink: Drink) {
    console.log('Delete drink', drink);
  }

}
