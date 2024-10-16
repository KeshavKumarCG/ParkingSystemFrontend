import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authService.getUserRole(); // Assuming you have this method to get the user's role

    if (this.authService.isAuthenticated() && userRole === expectedRole) {
      return true;  // Allow access if authenticated and roles match
    } else {
      this.router.navigate(['/login']);  // Redirect to login if not authenticated or roles don't match
      return false;
    }
  }
}
