import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Discount } from '../../Model/Discount';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {
  registerDiscountForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.registerDiscountForm = this.formBuilder.group({
      discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });
  }

  insertDiscount() {
    this.submitted = true;

    if (this.registerDiscountForm.invalid) {
      return;
    }

    const data: Discount = this.registerDiscountForm.value;

    this.adminService.addDiscount(data)
      .subscribe(
        (discount) => {
          console.log('Added discount is: ' + discount);
          this.router.navigate(['admin-dashboard/display-discounts']);
        }
      );
  }

  validateStartDate(control: { value: string | number | Date; }) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate >= currentDate) {
      return { minDate: true };
    }
    return null;
  }

  validateEndDate(control: { value: string | number | Date; }) {
    const startDateControl = this.registerDiscountForm.get('startDate');
    if (!startDateControl) {
      return null;
    }
    const startDate = new Date(startDateControl.value);
    const endDate = new Date(control.value);
    if (endDate >= startDate) {
      return { minStartDate: true };
    }
    return null;
  }

}
