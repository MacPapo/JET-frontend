import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
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
 

    toggleAllDrinks(id: string) {
        this.orders.forEach((order: any) => {
            if (order._id === id) {
                order.drinks.forEach((drink: any) => {
                    drink.checked = order.checkedDrink;
                });
            }
        });
    }

    updateAllComplete(id: string) {
        this.orders.forEach((order: any) => {
            if (order._id === id) {
                order.checkedDrink =
                    order.drinks != null &&
                    order.drinks.every((t: any) => t.checked);
            }
        });
    }

    someComplete(id: string): boolean {
        let result = false;

        this.orders.forEach((order: any) => {
            if (order._id === id) {
                if (order.drinks == null) {
                    result = false;
                } else {
                    result =
                        order.drinks.some((t: any) => t.checked) &&
                        !order.drinks.every((t: any) => t.checked);
                }
            }
        });

        return result;
    }

    setAll(id: string, completed: boolean) {
        this.orders.forEach((order: any) => {
            if (order._id === id) {
                order.checkedDrink = completed;
                order.drinks.forEach((t: any) => (t.checked = completed));
            }
        });
    }
}
