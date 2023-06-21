import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrderService, GetCacheOrdersResponse } from 'src/app/services/order/order.service';

@Component({
    selector: 'app-bartender-home',
    templateUrl: './bartender-home.component.html',
    styleUrls: ['./bartender-home.component.css']
})
export class BartenderHomeComponent {
    orders: any[] = [];
    panelOpenState = false;
    role: string = 'bartender';

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

    private getOrderDetails(id: string) {
        this.orderService
            .getOrderDetail(this.role, id)
            .subscribe((response: any) => {
                console.log(response);
            });
    }
}
