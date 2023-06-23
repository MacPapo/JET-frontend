import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrderService, GetCacheOrdersResponse } from 'src/app/services/order/order.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CacheOrder } from 'src/app/interfaces/order.interface';
import { CacheProductOrdered } from 'src/app/interfaces/order.interface';

@Component({
    selector: 'app-cooker-home',
    templateUrl: './cooker-home.component.html',
    styleUrls: ['./cooker-home.component.css']
})
export class CookerHomeComponent {
    orders: CacheOrder[] = [];
    role: string = 'cooker';

    constructor(
        private orderService: OrderService,
        private datePipe: DatePipe,
        private socketService: SocketService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.socketService.connect();

        this.getOrders();

        this.socketService.on('cooker-complete-order', () => {
            this.getOrders();
        });

        this.socketService.on('cooker-new-order', (message) => {
            this.openSnackBar(message, 'Close', 4000);
            this.getOrders();
        });
    }

    ngOnDestroy(): void {
        this.socketService.disconnect();
    }

    private openSnackBar(message: string, action: string, duration: number) {
        this.snackBar.open(message, action, {
            duration,
        });
    }


    private getOrders() {
        this.orderService
            .getProductOrders(this.role)
            .subscribe((response: GetCacheOrdersResponse) => {
                this.orders = response.data;
            });
    }


    toggleAllFoods(id: string) {
        this.orders.forEach((order: CacheOrder) => {
            if (order._id === id)
                order.foods.map((food: any) => (food.checked = order.checkedFoods));
        });
    }

    updateAllComplete(id: string) {
        this.orders.forEach((order: CacheOrder) => {
            if (order._id === id) {
                order.checkedFoods =
                    order.foods != null &&
                    order.foods.every((t: any) => t.checked);
            }
        });
    }

    someComplete(id: string): boolean {
        let result = false;

        this.orders.forEach((order: CacheOrder) => {
            if (order._id === id)
                !order.foods
                    ? (result = false)
                    : (result = order.foods.filter((t: any) => t.checked).length > 0 && !order.checkedFoods);
        });

        return result;
    }

    setAll(id: string, completed: boolean) {
        let selectedOrder = null;
        this.orders.forEach((order: CacheOrder) => {
            if (order._id === id) {
                order.checkedFoods = completed;
                order.foods.forEach((t: CacheProductOrdered) => (t.checked = completed));
                selectedOrder = order;
            }
        });

        this.socketService.emit('cooker-complete-order', selectedOrder);
    }
}
