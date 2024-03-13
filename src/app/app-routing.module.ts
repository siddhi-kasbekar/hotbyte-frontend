import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterManagerComponent } from './adminDashboard/Components/register-manager/register-manager.component';
import { DashboardComponent } from './adminDashboard/Components/dashboard/dashboard.component';
import { AddRestaurantComponent } from './adminDashboard/Components/add-restaurant/add-restaurant.component';
import { DisplayRestaurantsComponent } from './adminDashboard/Components/display-restaurants/display-restaurants.component';
import { AddDiscountComponent } from './adminDashboard/Components/add-discount/add-discount.component';
import { DisplayDiscountComponent } from './adminDashboard/Components/display-discount/display-discount.component';

import { DisplayCustomersComponent } from './adminDashboard/Components/display-customers/display-customers.component';
import { DisplayManagersComponent } from './adminDashboard/Components/display-managers/display-managers.component';
import { LandingComponent } from './landing/landing.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuardService } from './Security/auth-guard.service';
import { ManagerDashboardComponent } from './managerDashboard/Components/manager-dashboard/manager-dashboard.component';
import { AddMenuItemsComponent } from './managerDashboard/Components/add-menu-items/add-menu-items.component';
import { DisplayMenuItemsComponent } from './managerDashboard/Components/display-menu-items/display-menu-items.component';
import { DisplayOrdersComponent } from './managerDashboard/Components/display-orders/display-orders.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegisterationComponent } from './customer-registeration/customer-registeration.component';
import { CustomerDashboardComponent } from './CustomerDashboard/customer-dashboard/customer-dashboard.component';



import { CheckoutComponent } from './CustomerDashboard/checkout/checkout.component';
import { DisplayMenuItemsListComponent } from './CustomerDashboard/display-menu-items-list/display-menu-items-list.component';
import { OrderHistoryComponent } from './CustomerDashboard/order-history/order-history.component';
import { DisplayCategoryComponent } from './managerDashboard/Components/display-category/display-category.component';
import { AddCategoryComponent } from './managerDashboard/Components/add-category/add-category.component';
import { PaymentSuccessComponent } from './CustomerDashboard/payment-success/payment-success.component';
import { CartComponent } from './CustomerDashboard/cart/cart.component';


const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: 'admin' },
    children: [
      { path: 'register-manager', component: RegisterManagerComponent },
      { path: 'add-restaurant', component: AddRestaurantComponent },
      { path: 'display-restaurant', component: DisplayRestaurantsComponent },
      { path: 'add-discounts', component: AddDiscountComponent },
      { path: 'display-discounts', component: DisplayDiscountComponent },
      { path: 'display-customers', component: DisplayCustomersComponent },
      { path: 'display-managers', component: DisplayManagersComponent },
    ],
  },
  {
    path: 'manager-dashboard',
    component: ManagerDashboardComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: 'manager' },
    children: [
      { path: 'add-menu', component: AddMenuItemsComponent },
      { path: 'display-menuitems', component: DisplayMenuItemsComponent },
      { path: 'display-orders', component: DisplayOrdersComponent },

      { path: 'display-category', component: DisplayCategoryComponent },
      { path: 'add-category', component: AddCategoryComponent }

    ],
  },


  { path: '', pathMatch: 'full', redirectTo: 'landing-page' }, // Redirect to landing-page by default

  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'landing-page', component: LandingComponent },
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'customer-register', component: CustomerRegisterationComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'menu-items/:restaurantId', component: DisplayMenuItemsListComponent },
  { path: 'cart/:customerId', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orders/:customerId', component: OrderHistoryComponent },
  { path: 'payment-success', component: PaymentSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


