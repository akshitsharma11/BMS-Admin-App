import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteCustomerComponent } from '../delete-customer/delete-customer.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserService } from '../services/user.service';
import { ShowDetailsComponent } from '../show-details/show-details.component';

@Component({
  selector: 'app-show-all-users',
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.css']
})
export class ShowAllUsersComponent implements OnInit {

  allUsers = [];

  filteredStatus = '';
  p:number =1;

  constructor(public matDialog:MatDialog,private userService:UserService,private spinner:NgxSpinnerService,private toast:ToastrService)
  {
    this.userService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.userService.getAllUsers().subscribe(res=>{
      this.allUsers = res["users"];
      this.spinner.hide();
      console.log(this.allUsers);
    });
  }

  showDetails(user)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'show-details-component';
    // dialogConfig.height = "420px";
    dialogConfig.width = "500px";
    dialogConfig.maxHeight = "95vh";
    
    //For styling the mat-dialog (like borderRadius)
    dialogConfig.panelClass = 'custom-container1'; //Now, we have style this class in global styles.css

    //passing data
    dialogConfig.data = {user:user}
    
    const modalDialog = this.matDialog.open(ShowDetailsComponent,dialogConfig);   
  }

  openDeleteDialog(userId)
  {
    const dialogConfig = new MatDialogConfig();
    //if the user clicks outside the modal, it doesn’t close
    dialogConfig.disableClose = false;
    dialogConfig.id = 'del-module-component';
    dialogConfig.height = "220px";
    dialogConfig.width = "510px";

    //For styling the mat-dialog (like borderRadius)
    dialogConfig.panelClass = 'custom-container'; //Now, we have style this class in global styles.css

    //passing data
    dialogConfig.data = {userId:userId};
    
    const modalDialog = this.matDialog.open(DeleteCustomerComponent,dialogConfig);
  }

  openEditDialog(user)
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = 'edit-user-component';
    dialogConfig.height = "270px";
    dialogConfig.width = "460px";    
    //passing data
    dialogConfig.data = {user:user};

    const modalDialog = this.matDialog.open(EditUserComponent,dialogConfig);
  }

}
