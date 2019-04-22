import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router:Router,
              private authService:AuthenticationService) { }
  canActivate():boolean{
    
   return this.authService.isAuthenticated();
  }
}
