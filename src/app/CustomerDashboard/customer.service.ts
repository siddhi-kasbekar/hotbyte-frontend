import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../adminDashboard/Model/Customer';
import { Observable } from 'rxjs';
import { Restaurant } from '../adminDashboard/Model/Restaurant';
import { MenuItem } from '../managerDashboard/Model/MenuItem';
import { Category } from '../managerDashboard/Model/Category';
import { Password } from '../password';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {

  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addCustomer(body: Customer): Observable<Customer> {

    console.log(body);

    return this.http.post<Customer>("http://localhost:8080/api/v1/customers/register", body, { responseType: 'text' as 'json' })

  }

  getRestaurantByLocation(location: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>("http://localhost:8080/api/v1/restaurant/searchByLocation" + `/${location}`, { headers: this.getHeaders() });

  }

  getMenuItemsByRestaurantId(restaurantId: number): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/v1/menuItem/getByRestaurant" + `/${restaurantId}`, { headers: this.getHeaders() });
  }

  searchMenuByKeyword(restaurantId: number, keyword: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>("http://localhost:8080/api/v1/menuItem/getByKeyword" + `/${restaurantId}` + `/${keyword}`, { headers: this.getHeaders() });

  }

  addToCart(cartItem: any,customerId:number): Observable<any> {
    console.log(cartItem);

    return this.http.post<any>("http://localhost:8080/api/v1/cart/addToCart"+ `/${customerId}`, cartItem, { headers: this.getHeaders()  ,responseType: 'text' as 'json' });
  }

  getCartDetails(customerId: number): Observable<any[]> {
  

    return this.http.get<any[]>("http://localhost:8080/api/v1/cart/details"+ `/${customerId}`,{ headers: this.getHeaders() });
  }

  removeFromCart(menuItemId: number, customerId:number): Observable<any> {
    
    return this.http.delete<any>("http://localhost:8080/api/v1/cart/removeFromCart" + `/${customerId}`+ `/${menuItemId}`, { headers: this.getHeaders(),responseType: 'text' as 'json' });
  }

  placeOrder(customerId: number,requestBody:any): Observable<any> {
   
    return this.http.post<any>("http://localhost:8080/api/v1/order/placeOrder"+`/${customerId}`, requestBody,{ headers: this.getHeaders() });
  }

  searchMenuByCategory( restaurantId: number,category: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>("http://localhost:8080/api/v1/menuItem/getByCategory" + `/${restaurantId}` + `/${category}`, { headers: this.getHeaders() });

  }

  getOrderHistory(customerId: number): Observable<any[]> {
  

    return this.http.get<any[]>("http://localhost:8080/api/v1/order/viewHistory"+ `/${customerId}`,{ headers: this.getHeaders() });
  }


getMenuByPriceRange( restaurantId: number,minPrice:number,maxPrice:number): Observable<MenuItem[]> {
  return this.http.get<MenuItem[]>("http://localhost:8080/api/v1/menuItem/getByPriceRange" + `/${restaurantId}` + `/${minPrice}`+ `/${maxPrice}`, { headers: this.getHeaders() });

}

makePaymentRequest(customerId: number,requestBody:any): Observable<any>{
  return this.http.post<any>("http://localhost:8080/api/v1/payment/processPayment"+`/${customerId}`, requestBody,{ headers: this.getHeaders(),responseType: 'text' as 'json'  });


}

getCategoryByRestaurant( restaurantId: number): Observable<Category[]> {
  return this.http.get<Category[]>("http://localhost:8080/api/v1/menuCategory/get-category" + `/${restaurantId}` , { headers: this.getHeaders() });

}

searchMenuByDietaryInfo( restaurantId: number,dietaryInfo: string): Observable<MenuItem[]> {
  return this.http.get<MenuItem[]>("http://localhost:8080/api/v1/menuItem/getBySpecialDietaryInfo" + `/${restaurantId}` + `/${dietaryInfo}`, { headers: this.getHeaders() });

}


applyDiscount(customerId: number): Observable<any> {
   
  return this.http.get<any>("http://localhost:8080/api/v1/cart/applyDiscount"+`/${customerId}`, { headers: this.getHeaders() ,responseType: 'text' as 'json'});
}

clearCart(customerid:number): Observable<any> {
  return this.http.delete<any>("http://localhost:8080/api/v1/cart/clearAll"+`/${customerid}`, { headers: this.getHeaders(),responseType: 'text' as 'json'});
}

newPassword(requestBody:Password): Observable<string>{
  console.log(requestBody);
  
  return this.http.put<string>("http://localhost:8080/api/v1/customers/updatePassword", requestBody,{ responseType: 'text' as 'json'  });
}

getCustomerById(customerId: number): Observable<any>{
  return this.http.get<any>("http://localhost:8080/api/v1/customers/getById"+`/${customerId}`, { headers: this.getHeaders() ,responseType: 'text' as 'json'});


}

}
