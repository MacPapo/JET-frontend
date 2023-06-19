import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

// Common Components
import { NavbarComponent } from './components/navbar/navbar.component';

// Custom Components
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';

// Custom Modules
import { MaterialModule } from './material/material.module';
import { WaiterHomeComponent } from './components/waiter/waiter-home/waiter-home.component';
import { CookerHomeComponent } from './components/cooker/cooker-home/cooker-home.component';
import { BartenderHomeComponent } from './components/bartender/bartender-home/bartender-home.component';
import { CashierHomeComponent } from './components/cashier/cashier-home/cashier-home.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RegistrationFailedDialogComponent } from './components/auth/registration-failed-dialog/registration-failed-dialog.component';
import { SnackbarComponent } from './components/shared/snackbar/snackbar.component';
import { LoginFailedDialogComponent } from './components/auth/login-failed-dialog/login-failed-dialog.component';
import { ControlPanelComponent } from './components/admin/control-panel/control-panel.component';
import { TableListComponent } from './components/table/table-list/table-list.component';
import { TableFormComponent } from './components/table/table-form/table-form.component';
import { FoodListComponent } from './components/food/food-list/food-list.component';
import { FoodFormComponent } from './components/food/food-form/food-form.component';
import { DrinkListComponent } from './components/drink/drink-list/drink-list.component';
import { DrinkFormComponent } from './components/drink/drink-form/drink-form.component';
import { ErrorDialogComponent } from './components/shared/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { OrderFormComponent } from './components/order/order-form/order-form.component';
import { WaiterFoodListComponent } from './components/food/waiter-food-list/waiter-food-list.component';

// AuthGuards and Interceptors
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptorProvider } from './interceptors/jwt.interceptor';
import { WaiterDrinkListComponent } from './components/drink/waiter-drink-list/waiter-drink-list.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { BillsComponent } from './components/admin/bills/bills.component';
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        WaiterHomeComponent,
        CookerHomeComponent,
        BartenderHomeComponent,
        CashierHomeComponent,
        LogoutComponent,
        RegistrationFailedDialogComponent,
        SnackbarComponent,
        LoginFailedDialogComponent,
        ControlPanelComponent,
        TableListComponent,
        TableFormComponent,
        FoodListComponent,
        FoodFormComponent,
        DrinkListComponent,
        DrinkFormComponent,
        ErrorDialogComponent,
        ConfirmDialogComponent,
        OrderFormComponent,
        WaiterFoodListComponent,
        WaiterDrinkListComponent,
        OrderListComponent,
        BillsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
    ],
    providers: [
        AuthGuard,
        DatePipe,
        JwtInterceptorProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
