import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SubadminService } from 'src/app/services/subadmin.service';

@Component({
  selector: 'app-edit-subadmin',
  templateUrl: './edit-subadmin.component.html',
  styleUrls: ['./edit-subadmin.component.css']
})
export class EditSubadminComponent implements OnInit {

  subAdminId;
  subAdminDetails;

  permissions = ['Users','Studios','SubAdmins','Discounts','Bookings','Transactions','Notifications', 'Owners', 'Slots'];

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
    private route:ActivatedRoute,
    private toast:ToastrService,
    private spinner:NgxSpinnerService
  )
  {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(resParam=>{
      this.subAdminId = resParam['subAdminId'];
      this.subAdminService.getSingleSubAdmin(this.subAdminId).subscribe(res=>{
        if(res["status"])
        {
          this.subAdminDetails = res["subAdmin"];
          this.adminPerm = this.subAdminDetails.permissions;
        }
      })
      this.spinner.hide();
    });
  }

  onChange(checkBox:any)
  { 
    // this.subAdminData.permissions.push(checkBox.value);
    this.adminPerm.push(checkBox.value);
  }

  // for uni selection of checkbox
  data(e, id: any) {
    console.log("ID : ",id,e.target.checked);
    if (e.target.checked === true) {
      this.adminPerm.push(id);
    } else {
      for (let i = 0; i < this.adminPerm.length; i++) {
        if (this.adminPerm[i].toString().toLowerCase() === id.toString().toLowerCase()) {
          this.adminPerm.splice(i, 1);
          this.subAdminDetails.permissions = this.adminPerm;
        }
      }
    }
  }

  permCheck(permValue)
  {
    // console.log(permValue);
    const index = this.subAdminDetails.permissions.findIndex(i=>i.toString().toLowerCase()==permValue.toString().toLowerCase());
    if(index!=-1)
    {
      return true;
    }
    return false;
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
    this.subAdminService.editSingleSubAdmin(this.subAdminId,this.subAdminData).subscribe(res=>{
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
