import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtClientService } from 'src/app/Security/jwt-client.service';
import { CustomerService } from '../customer.service';
import { Customer } from 'src/app/adminDashboard/Model/Customer';
import { CustomerProfile } from '../CustomerProfile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent {

  editable: boolean = true;
  updateForm!: FormGroup;
  customerData$!: Observable<any>;

  
  // customer: Customer = {
  //   custId: 0,
  //   custName: '',
  //   gender: '',
  //   email: '',
  //   phone: '',
  //   username: '',
  //   password: '',
  //   addressDTO: {
  //     houseNo: '',
  //     area: '',
  //     landmark: '',
  //     city: '',
  //     pincode: 0
  //   }
  // };

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private customerService: CustomerService, private jwtClientService: JwtClientService
    , private router: Router) {


  }


  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      custName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      gender: [''],
      address: this.formBuilder.group({
        houseNo: [''],
        area: [''],
        landmark: [''],
        city: [''],
        pincode: ['', [Validators.pattern('^[1-9][0-9]{5}$')]]
      })
    });

    this.getCustomerDetails(); // Fetch customer details and prefill form

  }

  get updateFormControls() {
    return this.updateForm.controls;
  }

  getCustomerDetails(): void {
    const customerId = this.getCustomerIdFromLocalStorage();

    // Subscribe to the customer data observable
    this.customerData$ = this.customerService.getCustomerById(customerId);

    // Fetch customer data from the observable
    this.customerData$.subscribe(customer => {
      console.log('Customer Data:', customer);

      // Check if customer data is available
      if (customer) {
        // Update customer fields
        this.updateCustomerFields(customer);

        // Update address fields
        if (customer.address) {
          this.updateAddressFields(customer.address);
        } else {
          console.error('Customer address is undefined.');
        }
      }
    });
  }

  updateCustomerFields(customer: any): void {
    // Patch customer fields
    this.updateForm.patchValue({
      custName : customer.custName,
      username: customer.username,
      email: customer.email,
      phone: customer.phone,
      gender: customer.gender
    });
  }

  updateAddressFields(address: any): void {
    // Patch address fields
    this.updateForm.get('address')?.patchValue({
      houseNo: address.houseNo || '',
      area: address.area || '',
      landmark: address.landmark || '',
      city: address.city || '',
      pincode: address.pincode || ''
    });
  }





  get f() {
    return this.updateForm.controls;
  }

  toggleEditable() {
    this.editable = !this.editable;
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }
    const formData = this.updateForm.value;

    // Construct the request body with the required structure
    const requestBody = {
      custName: formData.custName, // Assuming username is equivalent to custName
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone,
      username: formData.username,
      password: formData.password,
      addressDTO: {
        houseNo: formData.address.houseNo,
        area: formData.address.area,
        landmark: formData.address.landmark,
        city: formData.address.city,
        pincode: formData.address.pincode
      }
    };

    const customerId = this.getCustomerIdFromLocalStorage();
    this.customerService.updateCustomerById(customerId, requestBody)
      .subscribe(response => {
        console.log(response);

        alert('Profile updated successfully');
        this.getCustomerDetails(); // Reload customer data after updating
      }, error => {
        alert('Failed to update profile');
      });
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
