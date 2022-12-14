import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {EditAdminComponent} from '../edit-admin/edit-admin.component'; 
import { AuthService } from '../services/auth.service';
import { StudioService } from '../services/studio.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstName = '';
  lastName = '';
  email = '';
  adminId;  
  userImage;

  uploadText;

  constructor(
    public matDialog:MatDialog,
    private authService:AuthService,
    private studioService:StudioService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService
  )
  {
    this.authService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.uploadText = "Loading Profile";
    this.spinner.show();

    this.adminId = JSON.parse(localStorage.getItem('authUserDataBMS')).adminId;
    console.log(this.adminId);
    this.authService.adminDetails(this.adminId).subscribe(res=>{
      this.firstName = res["admin"].firstName;
      this.lastName = res["admin"].lastName;
      this.email = res["admin"].email;
      this.userImage = res["admin"].adminImage;
      this.spinner.hide();     
    });  
    
  }

  selectImage(event)
  {
    this.uploadText = "Saving Image";

    const file = event.target.files[0];
    this.userImage = file;
    console.log(this.userImage);

    this.spinner.show();

    const formData = new FormData();
    formData.append("newImage",this.userImage);
    this.studioService.uploadSingleImage(formData).subscribe(res=>{
      if(res["status"])
      {
        this.userImage = res["imageUrl"];
        console.log(this.userImage);
        this.authService.editAdminImage(this.adminId,{adminImage:this.userImage}).subscribe(resAdmin=>{
          if(resAdmin["status"])
          {
            this.spinner.hide();
            this.toast.success(resAdmin["message"]);
            localStorage.setItem('authUserDataBMS',JSON.stringify(resAdmin["admin"]))
            this.authService.loggedIn.next(true);
          }
          else{
            this.spinner.hide();
            this.toast.error(resAdmin["message"]);
          }
        });
      }
      else{
        this.spinner.hide();
        this.toast.error(res["message"]);
      }
    })
  }

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    //if the user clicks outside the modal, it doesn???t close
    dialogConfig.disableClose = true;
    dialogConfig.id = 'edit-admin-component';
    dialogConfig.height = "550px";
    dialogConfig.width = "1000px";
    //passing data
    dialogConfig.data = {adminId:this.adminId}
    
    const modalDialog = this.matDialog.open(EditAdminComponent,dialogConfig);   

  }

}
