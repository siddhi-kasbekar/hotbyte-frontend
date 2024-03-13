import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtClientService } from 'src/app/Security/jwt-client.service';
import { CustomerService } from '../customer.service';
import { Customer } from 'src/app/adminDashboard/Model/Customer';
import { CustomerProfile } from '../CustomerProfile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent {

  customerForm: FormGroup; // Declare FormGroup
  customerData: CustomerProfile | undefined;

  // customer: CustomerProfile = {
  //   custId: 0,
  //   custName: '',
  //   gender: '',
  //   email: '',
  //   phone: '',
  //   username: '',
  //   password: '',
  //   address: {
  //     houseNo: '',
  //     area: '',
  //     landmark: '',
  //     city: '',
  //     pincode: 0
  //   }
  // };
  
  constructor( private formBuilder: FormBuilder ,private route: ActivatedRoute, private customerService: CustomerService, private jwtClientService: JwtClientService
    , private router: Router) {

      // Initialize form in constructor
    this.customerForm = this.formBuilder.group({
      custName: [''],
      gender: [''],
      email: [''],
      phone: [''],
      username: [''],
      password: [''],
      address: this.formBuilder.group({
        houseNo: [''],
        area: [''],
        landmark: [''],
        city: [''],
        pincode: ['']
      })
    });
     }


    ngOnInit(): void {

      this.getCustomerDetails(); // Fetch customer details and prefill form

    }


    getCustomerDetails(): void {
      const customerId = this.getCustomerIdFromLocalStorage();
      this.customerService.getCustomerById(customerId)
        .subscribe(
          (data: CustomerProfile) => {
            console.log("Received customer data:", data);

            this.customerData = data;
            console.log(data);
            
            this.prefillFormWithData(); // Prefill form with customer data
          },
          error => {
            console.log(error);
          }
        );
    }

    prefillFormWithData(): void {
      if (this.customerData) {
        this.customerForm.patchValue(this.customerData); // Prefill form with customer data
        this.customerForm.markAllAsTouched(); // Mark all form controls as touched
      }
    }
   

    onSubmit(): void {
      // this.customerService.updateCustomer(this.customer)
      //   .subscribe(
      //     () => {
      //       console.log('Customer updated successfully');
      //       this.router.navigate(['/success-page']);
      //     },
      //     error => {
      //       console.log(error);
      //     }
      //   );
    }





  getCustomerIdFromLocalStorage(): number {
    // Retrieve customer ID from localStorage
    const customerId = localStorage.getItem('customerId');

    return customerId ? parseInt(customerId, 10) : 0;
  }

  logout(): void {

    this.jwtClientService.clearStoredToken();
    localStorage.clear();
    // Redirect to the login page
    this.router.navigate(['/landing-page']);
  }

  

}
