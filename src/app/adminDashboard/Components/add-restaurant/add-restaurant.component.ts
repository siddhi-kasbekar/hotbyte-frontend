import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Restaurant } from '../../Model/Restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {

  registerRestaurantForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private router: Router) {

  }

  ngOnInit() {
    this.registerRestaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  get f() {
    return this.registerRestaurantForm.controls;
  }



  insertRestaurant(data: Restaurant) {
    this.adminService.addRestaurant(data)
      .subscribe(
        (res) => { console.log('Added restaurant is: ' + res);
        this.router.navigate(['/admin-dashboard/display-restaurant']); }
      );


  }


}
