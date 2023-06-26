import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { GetCacheOrdersResponse, OrderService } from 'src/app/services/order/order.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Order, CacheOrder, FoodBill } from 'src/app/interfaces/order.interface';
import { BillService } from 'src/app/services/bill/bill.service';
import { Bill } from 'src/app/interfaces/bill.interface';


@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent {
  orders: CacheOrder[] = [];
  selectedOrder: CacheOrder | undefined;
  totalPrice: number = 0;
  table = new FormControl('', [Validators.required]);

  constructor(private orderService: OrderService,
    private billService: BillService,
    public dialogRef: MatDialogRef<BillFormComponent>,) {}

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    this.orderService
      .getOrders('cashier')
      .subscribe((response: GetCacheOrdersResponse) => {
        this.orders = response.data;
      });
  }


  updateSelectedOrder() {
    const selectedOrderId = this.table.value;
    this.selectedOrder = this.orders.find(order => order._id === selectedOrderId);
    this.setTotalPrice();
  }

  private setTotalPrice() {
    this.totalPrice = 0;
    this.selectedOrder?.foods.forEach(food => {
      this.totalPrice += food.price * food.quantity;
    });
    this.selectedOrder?.drinks.forEach(drink => {
      this.totalPrice += drink.price * drink.quantity;
    });
  }

  addBill() {
    if (this.table.invalid) {
      this.triggerValidators();
      return;
    }

    const foods: FoodBill[] = this.selectedOrder?.foods.map(food => {
      return {
        _id: food._id,
        quantity: food.quantity,
        price: food.price,
      }
    })!;

    const drinks: FoodBill[] = this.selectedOrder?.drinks.map(drink => {
      return {
        _id: drink._id,
        quantity: drink.quantity,
        price: drink.price,
      }
    })!;

    const bill: Bill = {
      order: this.selectedOrder?._id!,
      table: this.selectedOrder?.table!,
      clients: this.selectedOrder?.clients!,
      totalPrice: this.totalPrice,
      foods: foods,
      drinks: drinks,
      serviceCharge: 2,
    }
    this.billService.createBill(bill).subscribe((bill) => {
      this.dialogRef.close('Bill added');
    }, (error) => {
      this.dialogRef.close('error');
    });
  }

  private triggerValidators(): void {
    if (this.table.untouched) {
      this.table.updateValueAndValidity();
    }
    this.table.markAsTouched();
  }

}
