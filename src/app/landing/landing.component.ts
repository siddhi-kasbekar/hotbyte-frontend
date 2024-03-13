import { Component } from '@angular/core';
import { AuthRequest } from '../Security/AuthRequest';
import { JwtClientService } from '../Security/jwt-client.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  response: any;
  token: any;

  authRequest: AuthRequest = new AuthRequest();

  constructor(private jwtService: JwtClientService) { }






  readFormData(formData: any) {

    this.authRequest.username = formData.form.value.username;
    this.authRequest.password = formData.form.value.password;

    this.getAccessToken(this.authRequest);

  }

  public getAccessToken(authRequest: any) {

    let response = this.jwtService.getGeneratedToken(authRequest);

    response.subscribe((genToken) => {
      this.token = genToken; console.log(genToken);
      this.accessApi(this.token)
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
  
      
    } else {
      console.error('Error accessing API');
    }
  }

}
