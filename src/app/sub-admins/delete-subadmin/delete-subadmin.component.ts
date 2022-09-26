import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SubadminService } from 'src/app/services/subadmin.service';

@Component({
  selector: 'app-delete-subadmin',
  templateUrl: './delete-subadmin.component.html',
  styleUrls: ['./delete-subadmin.component.css']
})
export class DeleteSubadminComponent implements OnInit {

  subAdminId;

  constructor(
    private toast:ToastrService,
    private subAdminService:SubadminService,
    public dialogRef:MatDialogRef<DeleteSubadminComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.subAdminId = data.subAdminId;
    console.log(this.subAdminId);
  }

  ngOnInit()
  {

  }

  closeModel()
  {
    this.dialogRef.close();
    this.subAdminService.filter("Deleted");
  }
  
  deleteSubAdmin()
  {
    this.subAdminService.deleteSingleSubAdmin(this.subAdminId).subscribe(res=>{
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
