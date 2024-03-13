import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtClientAdminService } from 'src/app/Security/jwt-client-admin.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {

  constructor(private router: Router,private jwtAdminService:JwtClientAdminService) {}

  logout(): void {

    this.jwtAdminService.clearStoredToken();
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }

}
