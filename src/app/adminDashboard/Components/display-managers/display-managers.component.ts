import { Component, ViewChild } from '@angular/core';

import { Manager } from '../../Model/Manager';
import { AdminService } from '../../admin.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-display-managers',
  templateUrl: './display-managers.component.html',
  styleUrls: ['./display-managers.component.css']
})
export class DisplayManagersComponent {

  managerList: Manager[] = [];
  pagedManagerList: Manager[] = [];
  pageSize: number = 5; // Number of items per page
  currentPage: number = 0; // Current page index
  totalItems: number = 0; // Total number of items

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllManagers();
  }

  getAllManagers() {
    this.adminService.getManagers().subscribe((list) => {
      this.managerList = list;
      this.totalItems = this.managerList.length;
      this.onPageChange({
        pageIndex: this.currentPage, pageSize: this.pageSize,
        length: 0
      }); // Trigger pagination
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedManagerList = this.managerList.slice(startIndex, endIndex);
  }

  removeManager(adminId: number) {
    this.adminService.deleteManager(adminId).subscribe((msg) => {
      console.log("Deleted " + msg);
      this.getAllManagers(); // Reload data after deletion
    });
  }

}
