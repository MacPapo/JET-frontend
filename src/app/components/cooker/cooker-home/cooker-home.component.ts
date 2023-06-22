import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrderService, GetCacheOrdersResponse } from 'src/app/services/order/order.service';

@Component({
    selector: 'app-cooker-home',
    templateUrl: './cooker-home.component.html',
    styleUrls: ['./cooker-home.component.css']
})
export class CookerHomeComponent {
    orders: any[] = [];
    panelOpenState: boolean = false;
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

    toggleAllFoods(id: string) {
        this.orders.forEach((order: any) => {
            if (order._id === id) {
                order.foods.forEach((food: any) => {
                    food.checked = order.checkedFood;
                });
            }
        });
    }

    updateAllComplete(id: string) {
        this.orders.forEach((order: any) => {
            if (order._id === id) {
                order.checkedFood =
                    order.foods != null &&
                    order.foods.every((t: any) => t.checked);
            }
        });
    }

    someComplete(id: string): boolean {
        let result = false;

        this.orders.forEach((order: any) => {
            if (order._id === id) {
                if (order.foods == null) {
                    result = false;
                } else {
                    result =
                        order.foods.some((t: any) => t.checked) &&
                        !order.foods.every((t: any) => t.checked);
                }
            }
        });

        return result;
    }

    setAll(id: string, completed: boolean) {
        this.orders.forEach((order: any) => {
            if (order._id === id) {
                order.checkedFood = completed;
                order.foods.forEach((t: any) => (t.checked = completed));
            }
        });
    }

}
