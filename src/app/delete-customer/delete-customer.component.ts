import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  userId;

  constructor(private toast:ToastrService,private userService:UserService,public dialogRef:MatDialogRef<DeleteCustomerComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.userId = +data.userId;  
    console.log(this.userId);
  }

  ngOnInit()
  {

  }

  closeModel()
  {
    this.dialogRef.close();
    this.userService.filter("Deleted");
  }
  
  deleteModule()
  {
    this.userService.deleteSingleUser(+this.userId).subscribe(res=>{
      if(res["status"])
      {
        this.toast.success(res["message"],"",{
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
    });
  }

}
