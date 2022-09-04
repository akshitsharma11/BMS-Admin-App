import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubadminService } from 'src/app/services/subadmin.service';

@Component({
  selector: 'app-create-subadmin',
  templateUrl: './create-subadmin.component.html',
  styleUrls: ['./create-subadmin.component.css']
})
export class CreateSubadminComponent implements OnInit {

  permissions = ['Users','Studios','Sub-Admins','Discounts','Bookings','Transactions','Notifications'];

  adminPerm = [];

  subAdminData ={
    firstName:'',
    lastName:'',
    email :'',
    password:'',
    permissions:[]
  };

  constructor(
    private subAdminService:SubadminService,
    private routerBtn:Router,
    private toast:ToastrService
  )
  {

  }

  ngOnInit(): void {
  }

  onChange(checkBox:any)
  { 
    // this.subAdminData.permissions.push(checkBox.value);
    this.adminPerm.push(checkBox.value);
  }


  // for uni selection of checkbox
  data(e, id: any) {
    if (e.target.checked === true) {
      this.adminPerm.push(id);
    } else {
      for (let i = 0; i < this.adminPerm.length; i++) {
        if (this.adminPerm[i] === id) {
          this.adminPerm.splice(i, 1);
        }
      }
    }
  }

  onSubmit(form:NgForm)
  {
    console.log(form.value);
    this.subAdminData.firstName = form.value.firstName;
    this.subAdminData.lastName = form.value.lastName;
    this.subAdminData.email = form.value.email;
    this.subAdminData.password = form.value.password;
  
    //saving only unique value in subAdminData's permission
    for(var i = 0;i<this.adminPerm.length;i++)
    {
      if(this.subAdminData.permissions.indexOf(this.adminPerm[i])===-1)
      {
          this.subAdminData.permissions.push(this.adminPerm[i]);
      }
    }

    console.log(this.subAdminData);
    this.subAdminService.createNewSubAdmin(this.subAdminData).subscribe(res=>{
      if(res["status"])
      {
        this.toast.success(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
        this.routerBtn.navigate(['/admin/sub-admins']);
      }
      else{
        this.toast.error(res["message"],"Error",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
      }
    });
  }

}
