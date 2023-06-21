import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DrinkOrder } from 'src/app/interfaces/order.interface';
import { OrderService, GetDrinkOrdersResponse } from 'src/app/services/order/order.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bartender-home',
  templateUrl: './bartender-home.component.html',
  styleUrls: ['./bartender-home.component.css']
})
export class BartenderHomeComponent {
  orders: DrinkOrder[] = [];
  role: string = 'bartender';

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
    this.socketService.on('bartender-new-order', (message) => {
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
      .getDrinkOrders(this.role)
      .subscribe((response: GetDrinkOrdersResponse) => {
        this.orders = response.data;
      });
  }

  completeOrder(order: DrinkOrder) {
    this.socketService.emit('cooker-complete-order', order);
  }
}
