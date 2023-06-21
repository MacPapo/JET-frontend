import { Component } from '@angular/core';
import { OrderFormComponent } from '../../order/order-form/order-form.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/interfaces/order.interface';
import { SocketService } from 'src/app/services/socket/socket.service';

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
    orders: Order[] = [];
    role: string = 'waiter';

    constructor(public dialog: MatDialog,
                private orderService: OrderService,
                private socketService: SocketService) {}

    ngOnInit(): void {
        this.socketService.connect();
        this.getOrders();
    }

    private getOrders() {
        this.orderService
            .getOrders(this.role)
            .subscribe((response: GetOrderResponse) => {
                this.orders = response.data;
            });
    }

    private openDialog(enterAnimationDuration: string,
                       exitAnimationDuration: string) {
        const dialogRef = this.dialog.open(OrderFormComponent, {
            width: '80%',
            height: '70%',
            enterAnimationDuration,
            exitAnimationDuration,
            data: {}
        });


        dialogRef
            .afterClosed()
            .subscribe(result => {
                this.getOrders();
                
                if (result && result !== 'error') {
                    this.socketService.emit('new-order', result);
                }
            });
    }

    addOrder() {
        this.openDialog('500ms', '500ms');
    }
}
