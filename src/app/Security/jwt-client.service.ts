import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http: HttpClient) { }


  baseURL: string = 'http://localhost:8080/';

  getGeneratedToken(requestBody: any) {

    return this.http.post(this.baseURL + "api/v1/customers/login/authenticate", requestBody, { responseType: 'text' as 'json' });

  }

  authorizationTest(token: any) {
    const decodedToken = this.decodeToken(token);


    let tokenString = "Bearer " + token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    }).set("Authorization", tokenString);


    if (decodedToken) {
      localStorage.setItem('customerId', decodedToken.customerId);

      return {
        role: decodedToken.role,
        customerId: decodedToken.customerId
      };
    } else {
      console.error('Error decoding JWT token');
      alert("Invalid credentials / access denied");
      return null;
    }

  }


  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error decoding JWT token:', Error);
      return null;
    }
  }
  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }
  
  getStoredToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  clearStoredToken(): void {
    localStorage.removeItem('jwtToken');
  }

}
