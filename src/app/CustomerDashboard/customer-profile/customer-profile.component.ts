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

  customer: Customer = {
    custId: 0,
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
        addressDTO: this.formBuilder.group({
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
          this.customerData = data;
          this.prefillFormWithData();
        },
        error => {
          console.error(error);
        }
      );
    }

    

    prefillFormWithData(): void {
      console.log("Prefilling form with data:", this.customerData);
      if (this.customerData) {
        this.customerForm.patchValue({
          custName: this.customerData.custName,
          gender: this.customerData.gender,
          email: this.customerData.email, // Assuming email is editable
          phone: this.customerData.phone,
          username: this.customerData.username,
          password: this.customerData.password, // Consider security implications of pre-filling password
          addressDTO: {
            houseNo: this.customerData.address?.houseNo || '', // Handle potential undefined address
            area: this.customerData.address?.area || '',
            landmark: this.customerData.address?.landmark || '',
            city: this.customerData.address?.city || '',
            pincode: this.customerData.address?.pincode || 0
          }
        });
      }
    }
   

    onSubmit(): void {
      // Create a new Customer object and populate its properties from the form
      const updatedCustomer: Customer = {
        custId: this.getCustomerIdFromLocalStorage(),
        custName: this.customerForm.get('custName')?.value || '', // Get value from the form control
        gender: this.customerForm.get('gender')?.value || '', // Get value from the form control
        email: this.customerForm.get('email')?.value || '', // Get value from the form control
        phone: this.customerForm.get('phone')?.value || '', // Get value from the form control
        username: this.customerForm.get('username')?.value || '', // Get value from the form control
        password: this.customerForm.get('password')?.value || '', // Get value from the form control
        addressDTO: {
          houseNo: this.customerForm.get('addressDTO.houseNo')?.value || '', // Get value from the form control
          area: this.customerForm.get('addressDTO.area')?.value || '', // Get value from the form control
          landmark: this.customerForm.get('addressDTO.landmark')?.value || '', // Get value from the form control
          city: this.customerForm.get('addressDTO.city')?.value || '', // Get value from the form control
          pincode: this.customerForm.get('addressDTO.pincode')?.value || 0 // Get value from the form control
        }
      };
    
      // Call the service method to update the customer details
      this.customerService.updateCustomerById(updatedCustomer.custId, updatedCustomer).subscribe(
        (response) => {
          console.log('Customer updated successfully:', response);
        },
        (error) => {
          console.error('Error updating customer:', error);
        }
      );
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
