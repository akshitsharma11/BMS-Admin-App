import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ProfileComponent } from '../profile/profile.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  adminId;
  admin:any;
  showPassword: boolean;

  constructor(private authService:AuthService,private toast:ToastrService,public dialogRef:MatDialogRef<ProfileComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.adminId = data.adminId;
    console.log(this.adminId);
  }

  ngOnInit(): void {
    this.showPassword = false;
    this.authService.adminDetails(+this.adminId).subscribe(res=>{
      this.admin = res["admin"];
      console.log("Admin : ", this.admin);
    })
  }

  onSubmit(form:NgForm)
  {
    console.log(form.value);
    var newForm = {...form.value,adminId:this.admin.adminId}
    this.authService.editAdminDetails(newForm).subscribe(res=>{
      console.log("Result : ",res)
      if(res["status"])
      {
        localStorage.setItem('authUserDataBMS',JSON.stringify(res["admin"]))
        this.authService.loggedIn.next(true);
        // alert("Client Details Updated");
        this.toast.success("Admin Details Updated","Successs",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        this.closeModel();
      }
      else
      {
        this.toast.error("Details not updated....error occured("+res["message"]+")","Error",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    })
  
  }

  password()
  {
    this.showPassword = !this.showPassword;
  }

  closeModel()
  {
    this.dialogRef.close();
    this.authService.filter("Deleted");
  }
}
