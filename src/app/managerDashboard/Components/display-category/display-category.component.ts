import { Component, ViewChild } from '@angular/core';
import { Category } from '../../Model/Category';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ManagerService } from '../../manager.service';

@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.css']
})
export class DisplayCategoryComponent {
 CategoryList: Category[] = [];
  pagedCategoryList: Category[] = [];
  pageSize: number = 5; // Number of items per page
  currentPage: number = 0; // Current page index
  totalItems: number = 0; // Total number of items

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    const adminId = localStorage.getItem('adminId');

    if (adminId) {
      const parsedAdminId = parseInt(adminId, 10);
      console.log(parsedAdminId);
      
      this.managerService.getAllMenuCategory(parsedAdminId).subscribe((list) => {
        this.CategoryList = list;
        console.log( this.CategoryList);
        
        this.totalItems = this.CategoryList.length;
        this.onPageChange({
          pageIndex: this.currentPage, pageSize: this.pageSize,
          length: this.totalItems
        }); // Trigger pagination
      }, (error) => {
        console.error('Error fetching categories:', error);
      });
    } else {
      console.error('Admin ID not found in local storage.');
    }
  }


  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedCategoryList = this.CategoryList.slice(startIndex, endIndex);
  }

  removeMenuCategory(categoryid: number) {
    this.managerService.deleteMenuCategory(categoryid).subscribe((msg) => {
      console.log("Deleted " + msg);
      this.getAllCategories(); // Reload data after deletion
    });
  }
  
}
