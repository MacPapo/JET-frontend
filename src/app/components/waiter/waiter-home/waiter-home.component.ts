import { Component } from '@angular/core';
import { OrderFormComponent } from '../../order/order-form/order-form.component';
import { MatDialog } from '@angular/material/dialog';
import { GetCacheOrdersResponse, OrderService } from 'src/app/services/order/order.service';
import { CacheOrder, Order } from 'src/app/interfaces/order.interface';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
    selector: 'app-waiter-home',
    templateUrl: './waiter-home.component.html',
    styleUrls: ['./waiter-home.component.css']
})
export class WaiterHomeComponent {
    orders: CacheOrder[] = [];
    role: string = 'waiter';

    constructor(
        public dialog: MatDialog,
        private orderService: OrderService,
        private socketService: SocketService) {}

    ngOnInit(): void {
        this.socketService.connect();
        this.getOrders();
    }

    ngOnDestroy(): void {
        this.socketService.disconnect();
    }

    private getOrders() {
        this.orderService
            .getOrders(this.role)
            .subscribe((response: GetCacheOrdersResponse) => {
                this.orders = response.data;
            });
    }

    private openDialog(
        enterAnimationDuration: string,
        exitAnimationDuration:  string
    ) {
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
                    if (result.data.foods.length  > 0) this.socketService.emit('cooker-new-order', result.data);
                    if (result.data.drinks.length > 0) this.socketService.emit('bartender-new-order', result.data);
                }
            });
    }

    addOrder() {
        this.openDialog('500ms', '500ms');
    }
}
