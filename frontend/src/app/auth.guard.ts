import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: ApiService) { } 

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
      if (this.authService.isLoggedIn()) {
        return true;
      }      
      // navigate to login page as user is not authenticated      
      this.router.navigate(['/login']);      
      return false;  
    }   

} 
