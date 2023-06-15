import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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

// AuthGuards and Interceptors
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptorProvider } from './interceptors/jwt.interceptor';

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
    ],
    providers: [
        AuthGuard,
        JwtInterceptorProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
