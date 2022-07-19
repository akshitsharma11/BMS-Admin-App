import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-suspend-user',
  templateUrl: './suspend-user.component.html',
  styleUrls: ['./suspend-user.component.css']
})
export class SuspendUserComponent implements OnInit {

  daysOfSuspension = '';
  displayMode = 0;  //0-> initial, 1-> Temporary Suspension view, 2-> Permanent block view 

  userId;

  constructor(private toast:ToastrService,private userService:UserService,public dialogRef:MatDialogRef<SuspendUserComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.userId = +data.userId;  
    console.log(this.userId);
  }

  ngOnInit(): void {
  }

  changeToSuspension()
  {
    this.displayMode = 1;
  }

  changeToBan()
  {
    this.displayMode = 2;
  }

  suspendUser()
  {
    console.log(this.daysOfSuspension);
    this.userService.changeBlockingStatus(+this.userId,{blockingStatus:1,daysOfSuspension:+this.daysOfSuspension}).subscribe(res=>{
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

  banUser()
  {
    this.userService.changeBlockingStatus(+this.userId,{blockingStatus:2,daysOfSuspension:0}).subscribe(res=>{
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
