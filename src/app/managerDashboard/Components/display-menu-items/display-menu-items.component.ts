
import { Component, ViewChild } from '@angular/core';
import { MenuItem } from '../../Model/MenuItem';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/adminDashboard/admin.service';
import { ManagerService } from '../../manager.service';

@Component({
  selector: 'app-display-menu-items',
  templateUrl: './display-menu-items.component.html',
  styleUrls: ['./display-menu-items.component.css']
})
export class DisplayMenuItemsComponent {

  MenuItemList: MenuItem[] = [];
  pagedMenuItemList: MenuItem[] = [];
  pageSize: number = 5; // Number of items per page
  currentPage: number = 0; // Current page index
  totalItems: number = 0; // Total number of items

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getAllMenuItems();
  }

  getAllMenuItems() {
    // Get adminId from local storage
    const adminId = localStorage.getItem('adminId');

    if (adminId) {
      // Parse the adminId to a number if needed
      const parsedAdminId = parseInt(adminId, 10);

      this.managerService.getMenuItems(parsedAdminId).subscribe((list) => {
        this.MenuItemList = list;
        this.totalItems = this.MenuItemList.length;
        this.onPageChange({
          pageIndex: this.currentPage, pageSize: this.pageSize,
          length: 0
        }); // Trigger pagination
      });
    } else {
      console.error('Admin ID not found in local storage.');
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedMenuItemList = this.MenuItemList.slice(startIndex, endIndex);
  }

  removeMenuItem(menuid: number) {
    this.managerService.deleteMenuItem(menuid).subscribe((msg) => {
      console.log("Deleted " + msg);
      this.getAllMenuItems(); 
    });
  }
}
