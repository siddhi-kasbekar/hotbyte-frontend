import { Component } from '@angular/core';
import { JwtClientService } from '../Security/jwt-client.service';
import { Router } from '@angular/router';
import { AuthRequest } from '../Security/AuthRequest';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent {
  response: any;
  token: any;

  authRequest: AuthRequest = new AuthRequest();

constructor(private jwtService: JwtClientService,private router: Router ) { }






  readFormData(formData: any) {

    this.authRequest.username = formData.form.value.username;
    this.authRequest.password = formData.form.value.password;

    this.getAccessToken(this.authRequest);

  }

  public getAccessToken(authRequest: any) {

    let response = this.jwtService.getGeneratedToken(authRequest);

    response.subscribe((genToken) => {
      this.token = genToken; 
      console.log(genToken);
       // Storing the token in local storage
       this.jwtService.storeToken(this.token);
      this.accessApi(this.token)
    },
    (error) => {
      
      console.error('Error generating token:', error);
      alert("Invalid credentials. Error generating token ");
  
      
    });

  }

  public accessApi(token: any): void {
    const decodedToken = this.jwtService.authorizationTest(token);
  
    if (decodedToken) {
      console.log('Decoded Token Claims:', decodedToken);
  
      const role = decodedToken.role;
      const customerId = decodedToken.customerId;
    
      console.log(role);
      console.log(customerId);
      if (role === 'customer') {
        console.log('Navigating to customer-dashboard...');
        this.router.navigate(['/customer-dashboard']);
      } 
      
      else {
        console.log('Permission denied. No navigation.');
        alert("Invalid credentials.  ");
      }
  
    } else {
      console.error('Error accessing API');
    }
  }
}
