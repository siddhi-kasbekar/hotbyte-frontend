import { Component } from '@angular/core';
import { CustomerService } from '../CustomerDashboard/customer.service';
import { Router } from '@angular/router';
import { Password } from '../password';

@Component({
  selector: 'app-customer-forgot-password',
  templateUrl: './customer-forgot-password.component.html',
  styleUrls: ['./customer-forgot-password.component.css']
})
export class CustomerForgotPasswordComponent {
  constructor(private customerService:CustomerService, private router:Router){}

  resetpassword(data:Password){
        
    this.customerService.newPassword(data)
    .subscribe(() => {console.log(" password  updated");})

    this.router.navigate(['/customer-login']);

   
  }

}
