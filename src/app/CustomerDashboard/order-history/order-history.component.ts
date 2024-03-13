import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtClientService } from 'src/app/Security/jwt-client.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orderDetails: any[] = [];

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private jwtClientService: JwtClientService
    , private router: Router) { }



    ngOnInit() {
      this.refreshOrderDetails();
    }
  
    refreshOrderDetails() {
      const customerId = this.getCustomerIdFromLocalStorage();
      this.customerService.getOrderHistory(customerId).subscribe(
        (data) => {
          this.orderDetails = data;
        },
        (error) => {
          console.error('Error fetching cart details:', error);
        }
      );
    }

     // Get unique orderIds
  get uniqueOrderIds(): number[] {
    return Array.from(new Set(this.orderDetails.map(item => item.orderId)));
  }

  filterOrders(orderDetails: any[], orderId: number): any[] {
    return orderDetails.filter(order => order.orderId === orderId);
  }

  getTotalCostForOrderId(orderId: number): number {
    const order = this.orderDetails.find(order => order.orderId === orderId);
    return order ? order.totalCost : 0;
  }

  getOrderStatusForOrderId(orderId: number): string {
    
    const order = this.orderDetails.find(item => item.orderId === orderId);

    if (order) {
      return order.status;
    }

    return 'Status not available';
  }

  getSortedOrderIds(): number[] {
    return this.uniqueOrderIds.slice().sort((a, b) => b - a);
  }
  
  getCustomerIdFromLocalStorage(): number {
    
    const customerId = localStorage.getItem('customerId');

    return customerId ? parseInt(customerId, 10) : 0;
  }

  logout(): void {

    this.jwtClientService.clearStoredToken();
    localStorage.clear();
    
    this.router.navigate(['/landing-page']);
  }


}
