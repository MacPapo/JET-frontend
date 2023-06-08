import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { WaiterHomeComponent } from './components/waiter/waiter-home/waiter-home.component';
import { CookerHomeComponent } from './components/cooker/cooker-home/cooker-home.component';
import { BartenderHomeComponent } from './components/bartender/bartender-home/bartender-home.component';
import { CashierHomeComponent } from './components/cashier/cashier-home/cashier-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'waiter/home', component: WaiterHomeComponent },
  { path: 'cooker/home', component: CookerHomeComponent },
  { path: 'bartender/home', component: BartenderHomeComponent },
  { path: 'cashier/home', component: CashierHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
