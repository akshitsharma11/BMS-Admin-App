import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-delete-owner',
  templateUrl: './delete-owner.component.html',
  styleUrls: ['./delete-owner.component.css']
})
export class DeleteOwnerComponent implements OnInit {
  
  ownerId;

  constructor(
    private toast:ToastrService,
    private ownerService:OwnerService,
    public dialogRef:MatDialogRef<DeleteOwnerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.ownerId = data.ownerId;
    console.log(this.ownerId);
  }

  ngOnInit()
  {

  }

  closeModel()
  {
    this.dialogRef.close();
    this.ownerService.filter("Deleted");
  }
  
  deleteOwner()
  {
    this.ownerService.deleteSingleOwner(this.ownerId).subscribe(res=>{
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
