import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DrinkOrder } from 'src/app/interfaces/order.interface';
import { OrderService, GetDrinkOrdersResponse } from 'src/app/services/order/order.service';

@Component({
    selector: 'app-bartender-home',
    templateUrl: './bartender-home.component.html',
    styleUrls: ['./bartender-home.component.css']
})
export class BartenderHomeComponent {
    orders: DrinkOrder[] = [];
    role: string = 'bartender';

    constructor(private orderService: OrderService,
                private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.getOrders();
    }

    private getOrders() {
        this.orderService
            .getDrinkOrders(this.role)
            .subscribe((response: GetDrinkOrdersResponse) => {
                this.orders = response.data;
            });
    }
}
