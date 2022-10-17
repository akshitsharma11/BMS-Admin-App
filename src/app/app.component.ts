import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as $ from 'jquery';
import { TimeAgoPipe } from 'ngx-pipes';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimeAgoPipe]
})
export class AppComponent implements OnInit {

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
  permObj = { "Users": false, "Studios": false, "SubAdmins": false, "Discounts": false, "Bookings": false, "Transactions": false, "Notifications": false };
  allNotifications = [];
  today: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    // this.authService.listen().subscribe((m:any)=>{
    //   console.log(m);
    //   this.ngOnInit();
    // });
  }

  toggleFunc() {
    $("#menu-toggle").on('click', function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

  }

  ngOnInit() {
    this.today = new Date();
    this.today.setDate(this.today.getDate() - 3);
    this.authService.autoLogin();
    this.getAllNotifications();
    $("#menu-toggle").on('click', function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.authService.loggedIn.subscribe(res => {
      this.isLoggedIn = res;

      if (JSON.parse(localStorage.getItem('authUserDataBMS')) != null) {
        this.adminId = JSON.parse(localStorage.getItem('authUserDataBMS')).adminId;
        console.log(this.adminId);
        if (this.adminId != undefined) {
          this.authService.adminDetails(this.adminId).subscribe(res => {
            this.firstName = res["admin"].firstName;
            this.lastName = res["admin"].lastName;
            this.adminImage = res["admin"].adminImage;
          });
          //Set all Permissions to True
          Object.keys(this.permObj).forEach(v => this.permObj[v] = true)
          console.log(this.permObj);
        }
        else {
          this.subAdminEmail = JSON.parse(localStorage.getItem('authUserDataBMS')).email;
          // this.authService.subAdminDetails(this.subAdminId).subscribe(res=>{
          this.firstName = JSON.parse(localStorage.getItem('authUserDataBMS')).firstName;
          this.lastName = JSON.parse(localStorage.getItem('authUserDataBMS')).lastName;
          this.subAdminImage = JSON.parse(localStorage.getItem('authUserDataBMS')).subAdminImage;
          let newPermissions = localStorage.getItem('permissions');
          this.permissions = newPermissions.split(',');
          // console.log(this.permissions);
          this.permissions.forEach(singlePerm => {
            this.permObj[singlePerm] = true;
          });
          console.log(this.permObj);
          // });
        }
      }
    })
  }

  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe((res:any) => {
      this.allNotifications = res.notifications;
    },
    (error: any) => {});
  }

  deleteNotification(notificationId) {
    this.notificationService.deleteNotification(notificationId).subscribe((res:any) => {
      if(res.status) {
        this.allNotifications = [...this.allNotifications.filter(n => n._id !== notificationId)];
      }
    },
    (error: any) => {});
  }


  logout() {
    this.authService.logout();
  }

}
