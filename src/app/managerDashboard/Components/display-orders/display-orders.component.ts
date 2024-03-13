
import { Component, ViewChild } from '@angular/core';
import { ManagerService } from '../../manager.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Order } from '../../Model/Order';

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.css']
})
export class DisplayOrdersComponent {

  OrderList: any[] = [];            //ordersWithInfo: any[] = [];
  pagedOrderList: Order[] = [];
  pageSize: number = 5; // Number of items per page
  currentPage: number = 0; // Current page index
  totalItems: number = 0; // Total number of items

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    // Fetch adminId from localStorage
    const adminId = localStorage.getItem('adminId');

    // Check if adminId is available
    if (adminId) {
      // Parse adminId to a number
      const parsedAdminId = parseInt(adminId, 10);

      // Call getOrders with adminId
      this.managerService.getOrders(parsedAdminId).subscribe((list) => {
        this.OrderList = list;
        console.log(this.OrderList);
        this.totalItems = this.OrderList.length;
        this.onPageChange({
          pageIndex: this.currentPage, pageSize: this.pageSize,
          length: 0
        });
      });
    }
  }

  onStatusChange(orderId: number, newStatus: string) {
    this.managerService.onStatusChange(orderId, newStatus)
      .subscribe(updatedOrders => {
        this.OrderList = updatedOrders;
       
      }, error => {
        console.error('Error occurred while updating status:', error);
        
      });
  }


  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedOrderList = this.OrderList.slice(startIndex, endIndex);
  }

}
