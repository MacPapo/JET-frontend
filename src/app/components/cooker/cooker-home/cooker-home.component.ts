import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FoodOrder } from 'src/app/interfaces/order.interface';
import { OrderService, GetFoodOrdersResponse } from 'src/app/services/order/order.service';

@Component({
    selector: 'app-cooker-home',
    templateUrl: './cooker-home.component.html',
    styleUrls: ['./cooker-home.component.css']
})
export class CookerHomeComponent {
    orders: FoodOrder[] = [];
    role: string = 'cooker';

    constructor(private orderService: OrderService,
                private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.getOrders();
    }

    private getOrders() {
        this.orderService
            .getFoodOrders(this.role)
            .subscribe((response: GetFoodOrdersResponse) => {
                this.orders = response.data;
            });
    }
}
