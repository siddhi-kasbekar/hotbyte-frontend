import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from './Model/Restaurant';
import { Observable } from 'rxjs';
import { Discount } from './Model/Discount';
import { Manager } from './Model/Manager';
import { Customer } from './Model/Customer';
import { JwtClientAdminService } from '../Security/jwt-client-admin.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http:HttpClient) { 

  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  




  addRestaurant(body: Restaurant): Observable<Restaurant> {

    console.log(body);

    return this.http.post<Restaurant>("http://localhost:8080/api/v1/restaurant/register", body,{ headers: this.getHeaders(), responseType: 'text' as 'json' });

  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>("http://localhost:8080/api/v1/admin/getAllRestaurants",{ headers: this.getHeaders() });
  }

  deleteRestaurant(resid: number): Observable<string> {
    return this.http.delete<string>("http://localhost:8080/api/v1/admin/removeRestaurant" + `/${resid}`,{ headers: this.getHeaders(), responseType: 'text' as 'json' });
  }

  addDiscount(body: Discount): Observable<Discount> {
    console.log(body);
    return this.http.post<Discount>("http://localhost:8080/api/v1/admin/add-discount", body,{ headers: this.getHeaders() , responseType: 'text' as 'json'});
  }

  removeDiscount(discountid: number): Observable<String> {
    return this.http.delete<String>("http://localhost:8080/api/v1/admin/removeDiscount" + `/${discountid}`,{ headers: this.getHeaders() , responseType: 'text' as 'json'});
  }

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>("http://localhost:8080/api/v1/admin/getAllDiscounts",{ headers: this.getHeaders() });
  }



  addManager(body:Manager):Observable<Manager>{
    console.log(body);
    return this.http.post<Manager>("http://localhost:8080/api/v1/admin/register",body,{ headers: this.getHeaders(), responseType: 'text' as 'json' });

  }
  getManagers():Observable<Manager[]>{
    return this.http.get<Manager[]>("http://localhost:8080/api/v1/admin/getAllManagers",{ headers: this.getHeaders() });
  }

  deleteManager(mid:number):Observable<string>{
    return this.http.delete<string>("http://localhost:8080/api/v1/admin/removeManager"+`/${mid}`,{ headers: this.getHeaders(), responseType: 'text' as 'json' });
  }

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>("http://localhost:8080/api/v1/admin/getAllCustomers",{ headers: this.getHeaders() });
  }

  deleteCustomer(custid:number):Observable<string>{
    return this.http.delete<string>("http://localhost:8080/api/v1/admin/removeCustomer"+`/${custid}`,{ headers: this.getHeaders(), responseType: 'text' as 'json' });
  }


}
