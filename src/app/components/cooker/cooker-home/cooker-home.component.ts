import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CacheOrder, FoodOrder } from 'src/app/interfaces/order.interface';
import { OrderService, GetCacheOrdersResponse } from 'src/app/services/order/order.service';

@Component({
    selector: 'app-cooker-home',
    templateUrl: './cooker-home.component.html',
    styleUrls: ['./cooker-home.component.css']
})
export class CookerHomeComponent {
    orders: CacheOrder[] = [];
    role: string = 'cooker';

    constructor(private orderService: OrderService,
                private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.getOrders();
    }

    private getOrders() {
        this.orderService
            .getProductOrders(this.role)
            .subscribe((response: GetCacheOrdersResponse) => {
                this.orders = response.data;
            });
    }
}
