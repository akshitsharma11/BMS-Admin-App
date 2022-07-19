import { Component, Inject, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userDetails;

  constructor(private userService:UserService,public dialogRef:MatDialogRef<EditUserComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private toast:ToastrService,private spinner:NgxSpinnerService)
  {
    this.userDetails = data.user;
    console.log(this.userDetails);
  }

  ngOnInit(): void {
  }

  closeModel()
  {
    this.dialogRef.close();
    this.userService.filter("Edited");
  }


  onSubmit(form:NgForm)
  {
    const userData = {
      userId:+this.userDetails.userId,
      userName:form.value.userName,
      shortBio:form.value.shortBio
    };
    console.log(userData);

    this.userService.editUserDetails(userData).subscribe(res=>{
      if(res["status"])
      {
        this.toast.info(res["message"],"",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        this.closeModel();
      }else{
        this.toast.error(res["message"],"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    },err=>{
      this.toast.error(err,"Error Occured",{
        timeOut:2500,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    })
  }

}
