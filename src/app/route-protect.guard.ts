import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteProtectGuard implements CanActivate {

  constructor(
    private router: Router,private authService:AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let roles = route.data.roles as Array<string>;
      console.log(roles);

      if(localStorage.getItem('userType') == "sub-admin") {
        console.log("Sub-Admin");
        if(localStorage.getItem('permissions') != null) {
          let permissions = localStorage.getItem('permissions');
          let mappedPermissions = permissions.split(',');
          console.log(mappedPermissions);
          const indexCheck = mappedPermissions.findIndex(i=>i.toString()==roles[0]);
          console.log(indexCheck);
          if(indexCheck!=-1)
          {
            return true;
          }
          else{
            return false;
          }            
        }
        else {
          this.router.navigate(['/not-authorized']);
          return false;
        }
      }
      else{
        return true;
      }
  }
  
}
