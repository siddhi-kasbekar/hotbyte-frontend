import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterManagerComponent } from './adminDashboard/Components/register-manager/register-manager.component';
import { DashboardComponent } from './adminDashboard/Components/dashboard/dashboard.component';
import { AddRestaurantComponent } from './adminDashboard/Components/add-restaurant/add-restaurant.component';
import { DisplayCustomersComponent } from './adminDashboard/Components/display-customers/display-customers.component';
import { DisplayManagersComponent } from './adminDashboard/Components/display-managers/display-managers.component';
import { DisplayDiscountComponent } from './adminDashboard/Components/display-discount/display-discount.component';
import { AddDiscountComponent } from './adminDashboard/Components/add-discount/add-discount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule}  from '@angular/common/http';
import { DisplayRestaurantsComponent } from './adminDashboard/Components/display-restaurants/display-restaurants.component';
import { ManagerDashboardComponent } from './managerDashboard/Components/manager-dashboard/manager-dashboard.component';
import { DisplayOrdersComponent } from './managerDashboard/Components/display-orders/display-orders.component';
import { DisplayMenuItemsComponent } from './managerDashboard/Components/display-menu-items/display-menu-items.component';
import { AddMenuItemsComponent } from './managerDashboard/Components/add-menu-items/add-menu-items.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegisterationComponent } from './customer-registeration/customer-registeration.component';
import { CustomerDashboardComponent } from './CustomerDashboard/customer-dashboard/customer-dashboard.component';


import { RouterModule } from '@angular/router';

import { UpdateMenuItemsComponent } from './managerDashboard/Components/update-menu-items/update-menu-items.component';

import { DisplayMenuItemsListComponent } from './CustomerDashboard/display-menu-items-list/display-menu-items-list.component';
import { OrderHistoryComponent } from './CustomerDashboard/order-history/order-history.component';
import { AddCategoryComponent } from './managerDashboard/Components/add-category/add-category.component';
import { DisplayCategoryComponent } from './managerDashboard/Components/display-category/display-category.component';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PaymentSuccessComponent } from './CustomerDashboard/payment-success/payment-success.component';
import { CheckoutComponent } from './CustomerDashboard/checkout/checkout.component';
import { CartComponent } from './CustomerDashboard/cart/cart.component';
import { CustomerForgotPasswordComponent } from './customer-forgot-password/customer-forgot-password.component';
import { CustomerProfileComponent } from './CustomerDashboard/customer-profile/customer-profile.component';
import { ManagerProfileComponent } from './managerDashboard/Components/manager-profile/manager-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterManagerComponent,
    DashboardComponent,
    AddRestaurantComponent,
    DisplayCustomersComponent,
    DisplayManagersComponent,
    DisplayDiscountComponent,
    AddDiscountComponent,
    DisplayRestaurantsComponent,
    ManagerDashboardComponent,
    DisplayOrdersComponent,
    DisplayMenuItemsComponent,
    AddMenuItemsComponent,
    AdminLoginComponent,
    CustomerLoginComponent,
    CustomerRegisterationComponent,
    CustomerDashboardComponent,
    CartComponent,
    CheckoutComponent,
    
   
    UpdateMenuItemsComponent,
    
    
    DisplayMenuItemsListComponent,
    OrderHistoryComponent,
    AddCategoryComponent,
    DisplayCategoryComponent,
    PaymentSuccessComponent,
    CustomerForgotPasswordComponent,
    CustomerProfileComponent,
    ManagerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    RouterModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
