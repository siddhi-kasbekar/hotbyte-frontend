import { Component, ViewChild } from '@angular/core';

import { Discount } from '../../Model/Discount';
import { AdminService } from '../../admin.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-display-discount',
  templateUrl: './display-discount.component.html',
  styleUrls: ['./display-discount.component.css']
})
export class DisplayDiscountComponent {


  discountList: Discount[] = [];
  pagedDiscountList: Discount[] = [];
  pageSize: number = 5; // Number of items per page
  currentPage: number = 0; // Current page index
  totalItems: number = 0; // Total number of items

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllDiscounts();
  }

  getAllDiscounts() {
    this.adminService.getDiscounts().subscribe((list) => {
      this.discountList = list;
      this.totalItems = this.discountList.length;
      this.onPageChange({
        pageIndex: this.currentPage, pageSize: this.pageSize,
        length: 0
      }); // Trigger pagination
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedDiscountList = this.discountList.slice(startIndex, endIndex);
  }

  removeDiscount(discountId: number) {
    this.adminService.removeDiscount(discountId).subscribe((msg) => {
      console.log("Deleted " + msg);
      this.getAllDiscounts(); // Reload data after deletion
    });
  }

}
