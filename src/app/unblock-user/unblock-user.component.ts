import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-unblock-user',
  templateUrl: './unblock-user.component.html',
  styleUrls: ['./unblock-user.component.css']
})
export class UnblockUserComponent implements OnInit {

  userId;
  blockMsg;

  constructor(private toast:ToastrService,private userService:UserService,public dialogRef:MatDialogRef<UnblockUserComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.userId = +data.userId;
    this.blockMsg = data.blockMsg;
    // console.log(this.userId,this.blockMsg);
  }

  ngOnInit(): void {
  }
 
  unBlockUser()
  {
    this.userService.unblockUser(+this.userId).subscribe(res=>{
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
    });
  }

  closeModel()
  {
    this.dialogRef.close();
    this.userService.filter("Deleted");
  }

}
