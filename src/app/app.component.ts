import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public toggleNavbar = true;
  public isLoggedIn = false;

  public firstName = '';
  public lastName = '';
  public email = '';
  
  adminId;
  adminImage;

  isSuperAdmin = true;

  subAdminEmail;
  subAdminImage;
  permissions = [];
  permObj = {"Users":false,"Studios":false,"SubAdmins":false,"Discounts":false,"Bookings":false,"Transactions":false,"Notifications":false};
  
  constructor(private authService:AuthService,private router:Router)
  {
    // this.authService.listen().subscribe((m:any)=>{
    //   console.log(m);
    //   this.ngOnInit();
    // });
  }

  toggleFunc()
  {
   $("#menu-toggle").on('click',function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
  
  }

  ngOnInit()
  {
    this.authService.autoLogin();
    $("#menu-toggle").on('click',function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });   

    this.authService.loggedIn.subscribe(res=>
      {
        this.isLoggedIn = res; 

        if(JSON.parse(localStorage.getItem('authUserDataBMS'))!=null)
        {
          this.adminId = JSON.parse(localStorage.getItem('authUserDataBMS')).adminId;
          console.log(this.adminId);
          if(this.adminId!=undefined)
          {
            this.authService.adminDetails(this.adminId).subscribe(res=>{
              this.firstName = res["admin"].firstName;
              this.lastName = res["admin"].lastName;
              this.adminImage = res["admin"].adminImage;
            });
            //Set all Permissions to True
            Object.keys(this.permObj).forEach(v => this.permObj[v] = true)
            console.log(this.permObj);
          }
          else{
            this.subAdminEmail = JSON.parse(localStorage.getItem('authUserDataBMS')).email;
            // this.authService.subAdminDetails(this.subAdminId).subscribe(res=>{
              this.firstName = JSON.parse(localStorage.getItem('authUserDataBMS')).firstName;
              this.lastName = JSON.parse(localStorage.getItem('authUserDataBMS')).lastName;
              this.subAdminImage = JSON.parse(localStorage.getItem('authUserDataBMS')).subAdminImage;
              let newPermissions = localStorage.getItem('permissions');
              this.permissions = newPermissions.split(',');
              // console.log(this.permissions);
              this.permissions.forEach(singlePerm=>{
                this.permObj[singlePerm] = true;
              });
              console.log(this.permObj);
            // });
          }
        }
      })
  }


  logout()
  {
    this.authService.logout(); 
  }

}
