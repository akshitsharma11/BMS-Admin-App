import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoginGuardService {

  
  constructor(private service:AuthService, private router:Router)
  {

  }
  canActivate(route:ActivatedRouteSnapshot, router:RouterStateSnapshot) : boolean | Promise<boolean> | Observable<boolean|UrlTree>
  {
    var res = false;
    this.service.loggedIn.subscribe(result=>{
      res = result;
      console.log(res);
      if(res==true)
      {
        this.router.navigate(['/admin/dashboard'])
      }
    })
    
    return !res;
  }

}


