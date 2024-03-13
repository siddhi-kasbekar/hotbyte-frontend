import { Component, ViewChild } from '@angular/core';


import { Customer } from '../../Model/Customer';
import { AdminService } from '../../admin.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-display-customers',
  templateUrl: './display-customers.component.html',
  styleUrls: ['./display-customers.component.css']
})
export class DisplayCustomersComponent {

  customerList: Customer[] = [];
  pagedCustomerList: Customer[] = [];
  pageSize: number = 5; // Number of items per page
  currentPage: number = 0; // Current page index
  totalItems: number = 0; // Total number of items

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.adminService.getCustomers().subscribe((list) => {
      this.customerList = list;
      this.totalItems = this.customerList.length;
      this.onPageChange({
        pageIndex: this.currentPage, pageSize: this.pageSize,
        length: 0
      }); // Trigger pagination
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedCustomerList = this.customerList.slice(startIndex, endIndex);
  }

  removeCustomer(custId: number) {
    this.adminService.deleteCustomer(custId).subscribe((msg) => {
      console.log("Deleted " + msg);
      this.getAllCustomers(); // Reload data after deletion
    });
  }




}
