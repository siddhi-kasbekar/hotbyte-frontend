import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import { AdminService } from '../../admin.service';
import { Manager } from '../../Model/Manager';
import { Router } from '@angular/router';
import { Restaurant } from '../../Model/Restaurant';

@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css']
})
export class RegisterManagerComponent {

  registerManagerForm!:FormGroup;
  submitted = false;
  restaurants: Restaurant[] = []; // Array to hold the list of restaurants

  constructor(private formBuilder:FormBuilder,private adminService: AdminService,private router:Router) { 

  }

  ngOnInit(){

    this.registerManagerForm= this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]], // Only alphabets and space allowed
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]+$')]], // Alphanumeric characters only
      password :['',[Validators.required,Validators.minLength(6)]],
      restaurantId: ['', [Validators.required]],    


     
    });

    this.adminService.getRestaurants().subscribe(
      (restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  get f(){
    return this.registerManagerForm.controls;
  }



  registerManager(data:Manager){
    this.adminService.addManager(data)
    .subscribe(
            (res)=>{console.log('Added manager is: '+res);
            this.router.navigate(['/admin-dashboard/display-managers']);
          }
            );

  }


}
