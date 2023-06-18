import { Component } from '@angular/core';
import { OrderFormComponent } from '../../order/order-form/order-form.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order/order.service';
import Order from 'src/app/interfaces/order.interface';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';

interface GetOrderResponse {
  statusCode: string;
  message: string;
  data: Order[];
}

@Component({
  selector: 'app-waiter-home',
  templateUrl: './waiter-home.component.html',
  styleUrls: ['./waiter-home.component.css']
})
export class WaiterHomeComponent {
  private socket = io(environment.socketUrl);
  orders: Order[] = [];

  constructor(public dialog: MatDialog,
    private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    this.orderService.getOrders().subscribe((response: GetOrderResponse) => {
      this.orders = response.data;
    });
  }

  private openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '80%',
      height: '70%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOrders();

      if (result && result === 'added') {
        this.socket.emit('new-order', result);
      }
    });
  }

  addOrder() {
    this.openDialog('500ms', '500ms');
  }
}
