import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtClientAdminService } from 'src/app/Security/jwt-client-admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isMenuOpen: boolean = false;

  constructor(private router: Router,private jwtAdminService:JwtClientAdminService) {}


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {

    this.jwtAdminService.clearStoredToken();
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }
  


  

}
