import { AfterViewInit, Component, OnInit } from '@angular/core';
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

  constructor(private authService:AuthService)
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

        if(JSON.parse(localStorage.getItem('authUserData'))!=null)
        {
          this.adminId = JSON.parse(localStorage.getItem('authUserData')).adminId;
          console.log(this.adminId);
          this.authService.adminDetails({adminId:this.adminId}).subscribe(res=>{
            this.firstName = res["admin"].firstName;
            this.lastName = res["admin"].lastName;      
            this.adminImage = res["admin"].adminImage;      
          });
         
        }
      })
  }


  logout()
  {
    this.authService.logout(); 
  }

}
