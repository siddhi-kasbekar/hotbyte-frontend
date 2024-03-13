import { Component } from '@angular/core';
import { JwtClientService } from '../Security/jwt-client.service';
import { AuthRequest } from '../Security/AuthRequest';
import { JwtClientAdminService } from '../Security/jwt-client-admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  response: any;
  token: any;

  authRequest: AuthRequest = new AuthRequest();

constructor(private jwtServiceAdmin: JwtClientAdminService,private router: Router ) { }






  readFormData(formData: any) {

    this.authRequest.username = formData.form.value.username;
    this.authRequest.password = formData.form.value.password;

    this.getAccessToken(this.authRequest);

  }

  public getAccessToken(authRequest: any) {

    let response = this.jwtServiceAdmin.getGeneratedToken(authRequest);

    response.subscribe((genToken) => {
      this.token = genToken; 
      console.log(genToken);
       // Store the token in local storage
       this.jwtServiceAdmin.storeToken(this.token);
      this.accessApi(this.token)
    },(error) => {
      
      console.error('Error generating token:', error);
      alert("Invalid credentials. Error generating token ");
  
      
    }
   );

  }

  public accessApi(token: any): void {
    const decodedToken = this.jwtServiceAdmin.authorizationTest(token);
  
    if (decodedToken) {
      console.log('Decoded Token Claims:', decodedToken);
  
      const role = decodedToken.role;
      const customerId = decodedToken.customerId;
    // Store customerId in local storage
    localStorage.setItem('adminId', customerId);
      console.log(role);
      console.log(customerId);
      if (role === 'admin') {
        console.log('Navigating to admin-dashboard...');
        this.router.navigate(['/admin-dashboard/display-restaurant']);
      } 
      else if(role === 'manager'){
        console.log('Navigating to manager-dashboard...');
        this.router.navigate(['/manager-dashboard/display-menuitems']);


      }
      else {
        console.log('Permission denied. No navigation.');
        alert("Permission denied. No navigation.");
      }
  
    } else {
      console.error('Error accessing API');
      alert("Invalid credentials. Error accessing API ");//alert for invalid credentials
    }
  }

}
