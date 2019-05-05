import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './services/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth:AuthServiceService,private _router:Router){
    this._auth.isLoggedIn();
    console.log(this._auth.isLoggedIn());
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this._auth.isLoggedIn()){
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
