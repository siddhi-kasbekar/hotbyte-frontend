import { Component } from '@angular/core';
import { Customer } from '../adminDashboard/Model/Customer';
import { CustomerService } from '../CustomerDashboard/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-registeration',
  templateUrl: './customer-registeration.component.html',
  styleUrls: ['./customer-registeration.component.css']
})
export class CustomerRegisterationComponent {


  constructor (private customerService : CustomerService, private router: Router){}

  customer: Customer = {
    custId:0,
    custName: '',
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    addressDTO: {
        houseNo: '',
        area: '',
        landmark: '',
        city: '',
        pincode: 0
    }
};

registerCustomer(formData:any) {
  if (formData.invalid) {
      return;
  }

  this.customerService.addCustomer(this.customer).subscribe(
    (response) => {
      console.log('Customer added successfully:', response);
      this.router.navigate(['/customer-login']);      
    }
  );

  
}
}
