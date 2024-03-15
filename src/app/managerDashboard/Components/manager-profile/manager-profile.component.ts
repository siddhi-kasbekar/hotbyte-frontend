import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { ManagerService } from '../../manager.service';
import { JwtClientService } from 'src/app/Security/jwt-client.service';



@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent {
  editable: boolean = true;
  updateForm!: FormGroup;
  managerData$!: Observable<any>;

 

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private managerService:ManagerService, private jwtClientService: JwtClientService
    , private router: Router) {


  }


  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
      password: ['']
     
    });

    this.getManagerDetails(); // Fetch customer details and prefill form

  }

  get updateFormControls() {
    return this.updateForm.controls;
  }

  getManagerDetails(): void {
    const adminId = this.getAdminIdFromLocalStorage();

    this.managerData$ = this.managerService.getManagerById(adminId);

    this.managerData$.subscribe(manager => {
      console.log('Manager Data:', manager);

      // if customer data is available
      if (manager) {
        // Update customer fields
        this.updateManagerFields(manager);

       
      }
    });
  }

 

  updateManagerFields(manager: any): void {
    // Patch customer fields
    this.updateForm.patchValue({
      
      name: manager.name,
      email: manager.email,
      
    });
  }

  // updateAddressFields(address: any): void {
  //   // Patch address fields
  //   this.updateForm.get('address')?.patchValue({
  //     houseNo: address.houseNo || '',
  //     area: address.area || '',
  //     landmark: address.landmark || '',
  //     city: address.city || '',
  //     pincode: address.pincode || ''
  //   });
  // }

  // passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   const password = control.get('password')?.value;
  //   const confirm_password = control.get('confirm_password')?.value;
  
  //   if (password !== confirm_password) {
  //     return { passwordMismatch: true }; 
  //   } else {
  //     return null; // Passwords match
  //   }
  // }




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
      
      email: formData.email,
     
      name: formData.name,
      password: formData.password,
      
    };

    const adminId = this.getAdminIdFromLocalStorage();
    this.managerService.updateManagerById(adminId, requestBody)
    .subscribe(response => {
      console.log(response);

      alert('Profile updated successfully');
      this.getManagerDetails(); 
    }, error => {
      alert('Failed to update profile');
    });

    
  
  }

  getAdminIdFromLocalStorage(): number {
    const adminId = localStorage.getItem('adminId');
    console.log(adminId);
    

    return adminId ? parseInt(adminId, 10) : 0;
  }

  logout(): void {

    this.jwtClientService.clearStoredToken();
    localStorage.clear();
    // Redirect to the login page
    this.router.navigate(['/admin-login']);
  }
}
