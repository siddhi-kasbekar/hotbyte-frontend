import { Component, ViewChild } from '@angular/core';
import { Restaurant } from '../../Model/Restaurant';
import { AdminService } from '../../admin.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-display-restaurants',
  templateUrl: './display-restaurants.component.html',
  styleUrls: ['./display-restaurants.component.css']
})
export class DisplayRestaurantsComponent {

  restaurantList: Restaurant[] = [];
  pagedRestaurantList: Restaurant[] = [];
  pageSize: number = 5; // Number of items per page
  currentPage: number = 0; // Current page index
  totalItems: number = 0; // Total number of items

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.adminService.getRestaurants().subscribe((list) => {
      this.restaurantList = list;
      this.totalItems = this.restaurantList.length;
      this.onPageChange({
        pageIndex: this.currentPage, pageSize: this.pageSize,
        length: 0
      }); // Trigger pagination
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedRestaurantList = this.restaurantList.slice(startIndex, endIndex);
  }

  removeRestaurant(resid: number) {
    this.adminService.deleteRestaurant(resid).subscribe((msg) => {
      console.log("Deleted " + msg);
      this.getAllRestaurants(); // Reload data after deletion
    });
  }





        



}
