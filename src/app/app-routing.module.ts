import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { WaiterHomeComponent } from './components/waiter/waiter-home/waiter-home.component';
import { CookerHomeComponent } from './components/cooker/cooker-home/cooker-home.component';
import { BartenderHomeComponent } from './components/bartender/bartender-home/bartender-home.component';
import { CashierHomeComponent } from './components/cashier/cashier-home/cashier-home.component';
import { ControlPanelComponent } from './components/admin/control-panel/control-panel.component';
import { FoodListComponent } from './components/food/food-list/food-list.component';
import { DrinkListComponent } from './components/drink/drink-list/drink-list.component';
import { TableListComponent } from './components/table/table-list/table-list.component';
import { BillsComponent } from './components/admin/bills/bills.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },

    // Waiter
    { path: 'waiter/home', component: WaiterHomeComponent, canActivate: [AuthGuard] },

    // Cooker
    { path: 'cooker/home', component: CookerHomeComponent, canActivate: [AuthGuard] },

    // Bartender
    { path: 'bartender/home', component: BartenderHomeComponent, canActivate: [AuthGuard] },

    // Cashier
    { path: 'cashier/home', component: CashierHomeComponent, canActivate: [AuthGuard] },

    // Admin
    { path: 'admin', component: ControlPanelComponent, canActivate: [AuthGuard] },
    { path: 'admin/foods', component: FoodListComponent, canActivate: [AuthGuard] },
    { path: 'admin/drinks', component: DrinkListComponent, canActivate: [AuthGuard] },
    { path: 'admin/tables', component: TableListComponent, canActivate: [AuthGuard] },
    { path: 'admin/bills', component: BillsComponent, canActivate: [AuthGuard] },

    // Not found
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
