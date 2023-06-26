import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnChanges {
  @Input() status: string = '';
  @Input() orders: Order[] = [];

  constructor(private socketService: SocketService) {}

  ngOnChanges(): void {
    this.orders = this.orders.filter((order) => {
      return order.status === this.status;
    });
  }

  markAsDelivered(order: Order): void {
    this.socketService.emit('waiter-complete-order', order);
  }
}
