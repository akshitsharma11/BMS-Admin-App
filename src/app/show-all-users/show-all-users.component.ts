import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteCustomerComponent } from '../delete-customer/delete-customer.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserService } from '../services/user.service';
import { ShowDetailsComponent } from '../show-details/show-details.component';
import { SuspendUserComponent } from '../suspend-user/suspend-user.component';
import { UnblockUserComponent } from '../unblock-user/unblock-user.component';

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

  suspendUser(userId)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'suspend-user-component';
    dialogConfig.height = 'auto'
    dialogConfig.minWidth = "480px";
    dialogConfig.width = "auto";
    //passing data
    dialogConfig.data = {userId:userId}
    
    const modalDialog = this.matDialog.open(SuspendUserComponent,dialogConfig);   
  }

  unblockUser(userId,blockStatus)
  {
    let blockMsg = "";
    if(blockStatus==1)
    {
      blockMsg="User is already suspended, You want to un-suspend user?";
      // this.toast.error("User is already suspended","",{
      //   timeOut:2500,
      //   progressBar:true,
      //   progressAnimation:'increasing',
      //   positionClass:'toast-top-right'
      // });
    }
    else if(blockStatus==2)
    {
      blockMsg="User is already blocked, You want to un-block user?";
      // this.toast.error("User is already blocked","",{
      //   timeOut:2500,
      //   progressBar:true,
      //   progressAnimation:'increasing',
      //   positionClass:'toast-top-right'
      // });
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'unblock-user-component';
    dialogConfig.height = 'auto'
    dialogConfig.minWidth = "480px";
    dialogConfig.width = "auto";
    //passing data
    dialogConfig.data = {userId:userId,blockMsg:blockMsg};
    
    const modalDialog = this.matDialog.open(UnblockUserComponent,dialogConfig);   
  }

  openDeleteDialog(userId)
  {
    const dialogConfig = new MatDialogConfig();
    //if the user clicks outside the modal, it doesn’t close
    dialogConfig.disableClose = true;
    dialogConfig.id = 'del-module-component';
    dialogConfig.height = "190px";
    dialogConfig.width = "580px";
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
