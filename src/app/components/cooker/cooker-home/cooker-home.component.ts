import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FoodOrder } from 'src/app/interfaces/order.interface';
import { OrderService, GetFoodOrdersResponse } from 'src/app/services/order/order.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderStatus } from 'src/app/interfaces/order-status.enum';

@Component({
  selector: 'app-cooker-home',
  templateUrl: './cooker-home.component.html',
  styleUrls: ['./cooker-home.component.css']
})
export class CookerHomeComponent {
  orders: FoodOrder[] = [];
  role: string = 'cooker';

  constructor(private orderService: OrderService,
    private datePipe: DatePipe,
    private socketService: SocketService,
    private snackBar: MatSnackBar) {}

  private openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }


  ngOnInit(): void {
    this.socketService.connect();
    this.socketService.on('cooker-new-order', (message) => {
      this.openSnackBar(message, 'Close', 4000);
      this.getOrders();
    });
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  private getOrders() {
    this.orderService
      .getFoodOrders(this.role)
      .subscribe((response: GetFoodOrdersResponse) => {
        this.orders = response.data;
      });
  }

  completeOrder(order: FoodOrder) {
    this.socketService.emit('cooker-complete-order', order);
  }
}
