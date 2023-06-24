import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrderService, GetCacheOrdersResponse } from 'src/app/services/order/order.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CacheOrder } from 'src/app/interfaces/order.interface';
import { CacheProductOrdered } from 'src/app/interfaces/order.interface';

@Component({
    selector: 'app-bartender-home',
    templateUrl: './bartender-home.component.html',
    styleUrls: ['./bartender-home.component.css']
})
export class BartenderHomeComponent implements OnInit, OnDestroy {
    orders: CacheOrder[] = [];
    role: string = 'bartender';

    constructor(
        private orderService: OrderService,
        private datePipe: DatePipe,
        private socketService: SocketService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.socketService.connect();

        this.getOrders();

        this.socketService.on('bartender-complete-order', () => {
            this.getOrders();
        });

        this.socketService.on('bartender-new-order', (message) => {
            this.openSnackBar(message, 'Close', 4000);
            this.getOrders();
        });
    }

    ngOnDestroy(): void {
        console.log('destroyed bartender socket');
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


    toggleAllDrinks(id: string) {
        this.orders.forEach((order: CacheOrder) => {
            if (order._id === id)
                order.drinks.map((drink: any) => (drink.checked = order.checkedDrinks));
        });
    }

    updateAllComplete(id: string) {
        this.orders.forEach((order: CacheOrder) => {
            if (order._id === id) {
                order.checkedDrinks =
                    order.drinks != null &&
                    order.drinks.every((t: any) => t.checked);
            }
        });
    }

    someComplete(id: string): boolean {
        let result = false;

        this.orders.forEach((order: CacheOrder) => {
            if (order._id === id)
                !order.drinks
                    ? (result = false)
                    : (result = order.drinks.filter((t: any) => t.checked).length > 0 && !order.checkedDrinks);
        });

        return result;
    }

    setAll(id: string, completed: boolean) {
        let selectedOrder = null;
        this.orders.forEach((order: CacheOrder) => {
            if (order._id === id) {
                order.checkedDrinks = completed;
                order.drinks.forEach((t: CacheProductOrdered) => (t.checked = completed));
                selectedOrder = order;
            }
        });

        this.socketService.emit('bartender-complete-order', selectedOrder);
    }
}
