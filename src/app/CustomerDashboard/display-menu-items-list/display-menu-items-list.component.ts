import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { JwtClientService } from '../../Security/jwt-client.service';
import { MenuItem } from '../../managerDashboard/Model/MenuItem';
import { Category } from 'src/app/managerDashboard/Model/Category';
import { Observable, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-display-menu-items-list',
  templateUrl: './display-menu-items-list.component.html',
  styleUrls: ['./display-menu-items-list.component.css']
})
export class DisplayMenuItemsListComponent {
  [x: string]: any;
  restaurantId!: number;
  menuItems: any[] = [];
  searchMenu: string = '';
  isRemoveButtonDisabled = true;
  showOnlyVegetarian: boolean = false;
  selectedCategory: string = '';
  selectedPriceRange: string = '';
  categories: Category[] = [];
  selectedDietaryInfo!: string;
 
  constructor(private route: ActivatedRoute, private customerService: CustomerService, private jwtClientService: JwtClientService
    , private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurantId'];
      this.fetchMenuItems();
    });
    this.customerService.getCategoryByRestaurant(this.restaurantId).subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchMenuItems() {
    // Fetch menu items based on the restaurantId
    this.customerService.getMenuItemsByRestaurantId(this.restaurantId).subscribe(
      (response) => {
        // Filter menu items based on showOnlyVegetarian flag

        this.menuItems = response;

        this.menuItems.forEach(item => {
          item.decodedImage = 'data:image/jpeg;base64,' + item.image; // Assuming default format is JPEG
        });
      },
      (error) => {
        console.error('Error fetching menu items:', error);
      }
    );
  }








  getMenuByKeyword() {
    const keyword = this.searchMenu;
    this.customerService.searchMenuByKeyword(this.restaurantId, keyword)
      .subscribe((list) => {
        this.menuItems = list;

        this.menuItems.forEach(item => {
          item.decodedImage = 'data:image/jpeg;base64,' + item.image; // Assuming default format is JPEG
        });
        console.log(list);
      },
      (error) => {
        console.error('Error fetching menu items by keyword:', error);

        
        alert('No any matching items found ');
      });
  }

  logout(): void {

    this.jwtClientService.clearStoredToken();
    localStorage.clear();
    
    this.router.navigate(['/landing-page']);
  }

  

  addToCart(menuItemId: number, price: number) {
    const customerId = Number(localStorage.getItem('customerId'));

    if (customerId) {
      const defaultQuantity = 1;

      const cartItem = {
        menuItemId,
        quantity: defaultQuantity,
        price
      };

      this.customerService.addToCart(cartItem, customerId).subscribe(
        response => {
          console.log(response);
          alert(response);
        },
        error => {

          if (error.status === 403) {
            alert("To add item from another restaurant first clear your cart");
          }
        }
      );
    } else {
      console.error('customerId is not available in localStorage');

    }
    
  }

  getCustomerIdFromLocalStorage(): string | null {
    const customerId = localStorage.getItem('customerId');

    return customerId;
  }

  searchByDietaryInfo(): void {

    this.customerService.searchMenuByDietaryInfo(this.restaurantId, this.selectedDietaryInfo)
      .subscribe(
        (response) => {
          this.menuItems = response;
          console.log(this.menuItems);
          this.menuItems.forEach(item => {
            item.decodedImage = 'data:image/jpeg;base64,' + item.image;

          });
        },
        (error) => {
          console.error('Error fetching menu items:', error);
          alert("no items available for this category");
        });
  }








  filterByCategory() {
    this.customerService.searchMenuByCategory(this.restaurantId, this.selectedCategory)
      .subscribe(
        (response) => {
          this.menuItems = response;
          //  decode image data here
          this.menuItems.forEach(item => {
            item.decodedImage = 'data:image/jpeg;base64,' + item.image;
          });
        },
        (error) => {
          console.error('Error fetching menu items:', error);
          alert("no items available for this category");
        }
      );
  }

  sortByPriceRange() {
    console.log('Sorting by price range...');
    const [minPrice, maxPrice] = this.selectedPriceRange.split('-').map(Number);

    
    this.customerService.getMenuByPriceRange(this.restaurantId, minPrice, maxPrice)
      .subscribe(
        (response) => {
          this.menuItems = response;

          this.menuItems.forEach(item => {
            item.decodedImage = 'data:image/jpeg;base64,' + item.image;
            console.log('Response from getMenuByPriceRange:', response);
          });
        },
        (error) => {
          console.error('Error fetching menu items:', error);
        }
      );
  }

  applyFilters() {

    this.fetchMenuItems();
  }


}
