import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtClientAdminService } from 'src/app/Security/jwt-client-admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router,private jwtAdminService:JwtClientAdminService) {}

  logout(): void {

    this.jwtAdminService.clearStoredToken();
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }
  


  

}
