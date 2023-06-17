import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import Food from 'src/app/interfaces/food.interface';
import Table from 'src/app/interfaces/table.interface';
import { TableService } from 'src/app/services/table/table.service';
import { OrderService } from 'src/app/services/order/order.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { JwtService } from 'src/app/services/auth/jwt.service';

interface FoodQuantity extends Food {
  foodQuantity: number;
}

interface DrinkQuantity extends Food {
  drinkQuantity: number;
}

interface Product {
  _id: string;
  quantity: number;
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  clients = new FormControl(0, [Validators.required, Validators.min(1)]);
  table = new FormControl(0, [Validators.required]);
  waiter: string = '';
  tables: Table[] = [];
  foods: FoodQuantity[] = [];
  drinks: DrinkQuantity[] = [];

  constructor(private tableService: TableService,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<OrderFormComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private jwtService: JwtService) {}

  ngOnInit(): void {
    this.waiter = this.jwtService.getLoginData().userId;
    this.tableService.getTables().subscribe((tables) => {
      this.tables = tables.data.filter((table) => table.isAvailable === true);
    });
  }

  private openDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title, errorMessage }
    });
  }

  private openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }

  private mapFoodsToProducts(foods: FoodQuantity[]): Product[] {
    return foods.map((food) => ({
      _id: food._id!,
      quantity: food.foodQuantity,
    }));
  }

  private mapDrinksToProducts(drinks: DrinkQuantity[]): Product[] {
    return drinks.map((drink) => ({
      _id: drink._id!,
      quantity: drink.drinkQuantity,
    }));
  }

  addOrder() {
    console.log(this.table.value);
    if (this.clients.invalid || this.table.invalid) {
      this.triggerValidators();
    } else {
      this.orderService.addOrder({
        clients: this.clients.value!,
        table: this.table.value!,
        waiter: this.waiter,
        foods: this.mapFoodsToProducts(this.foods),
        drinks: this.mapDrinksToProducts(this.drinks),
      }).subscribe((order) => {
        this.openSnackBar('Order added successfully', 'Close', 4000);
        this.dialogRef.close('added');
      },
        (error) => {
          this.openDialog('500ms', '500ms', 'Order not added', error.error.message);
          this.dialogRef.close('error');
        }
      );
    }
  }


  handleFoodsAddedToOrder(foods: FoodQuantity[]) {
    this.foods = foods;
  }

  handleDrinksAddedToOrder(drinks: DrinkQuantity[]) {
    this.drinks = drinks;
  }

  private triggerValidators(): void {
    if (this.clients.untouched || this.table.untouched) {
      this.clients.updateValueAndValidity();
      this.table.updateValueAndValidity();
    }
    this.clients.markAsTouched();
    this.table.markAsTouched();
  }


}
