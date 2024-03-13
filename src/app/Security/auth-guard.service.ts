import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtClientAdminService } from './jwt-client-admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {



  constructor(private router: Router,private jwtClientAdminService:JwtClientAdminService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];

    // Get the user's role from the decoded token 
    const userRole = this.jwtClientAdminService.getUserRole();

    // Check if the user's role matches the expected role
    if (userRole === expectedRole) {
      return true;
    } else {
     localStorage.clear();
      this.router.navigate(['/admin-login']); // navigate back to the admin login page
      return false;
    }
  }
  
}
