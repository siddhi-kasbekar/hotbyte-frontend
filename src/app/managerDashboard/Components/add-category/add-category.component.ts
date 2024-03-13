import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ManagerService } from '../../manager.service';
import { Category } from '../../Model/Category';
import { Restaurant } from 'src/app/adminDashboard/Model/Restaurant';
import { AdminService } from 'src/app/adminDashboard/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  registerCategoryForm!: FormGroup;
  submitted = false;
  categories: Category[] = [];
  restaurants: Restaurant[] = [];
  selectedFile!: File;

  constructor(
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.registerCategoryForm= this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      
      restaurantId: ['', [Validators.required]],
      
    }); 


    const storedAdminId = localStorage.getItem('adminId');
    const adminId = storedAdminId !== null ? +storedAdminId : 0;
    this.managerService.getRestaurantsForManager(adminId).subscribe(
    (restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
      console.log(this.restaurants);
      
    },
    (error) => {
      console.error('Error fetching restaurants:', error);
    }
  );
  }
  

  

  get f() {
    return this.registerCategoryForm.controls;
  }




  insertCategory() {
    this.submitted = true;

    if (this.registerCategoryForm.invalid) {
      return;
    }
    const selectedRestaurantId: number = this.f['restaurantId'].value;
    console.log('Selected Restaurant ID:', selectedRestaurantId);


   

    const categoryDTO: Category = {
        categoryId: 0,
        categoryName: this.f['categoryName'].value,
        restaurantId: selectedRestaurantId,
    };

    this.managerService.addCategory(categoryDTO,selectedRestaurantId).subscribe(
      (menucategory) => {
        console.log('Added category is: ', menucategory);
        this.router.navigate(['/manager-dashboard/display-category']);
        this.fetchCategories();
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }

  // Method to fetch categories
  private fetchCategories() {
    const storedCustomerId = localStorage.getItem('adminId');
    const adminId = storedCustomerId !== null ? +storedCustomerId : 0;
    this.managerService.getAllMenuCategory(adminId).subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

}
