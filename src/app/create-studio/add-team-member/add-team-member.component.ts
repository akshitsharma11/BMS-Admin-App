import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudioService } from 'src/app/services/studio.service';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.css']
})
export class AddTeamMemberComponent implements OnInit {

  memberData;
  newImage:any = "";

  showImage = true;

  constructor(
  private studioService:StudioService,
  private toast:ToastrService,
  private spinner:NgxSpinnerService,
  public dialogRef:MatDialogRef<AddTeamMemberComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.memberData = data.memberData;
    console.log(this.memberData);
    if(this.memberData.name==undefined || this.memberData.name.length==0)
    {
      this.showImage = false;
    }
  }

  ngOnInit(): void {
  }

  selectImage(event:any)
  {
    this.spinner.show();
    const file = event.target.files[0];
    this.newImage = file;
    // console.log(this.newImage);

    const formData = new FormData();
    formData.append("newImage",this.newImage);
    this.studioService.uploadSingleImage(formData).subscribe((res:any)=>{
      if(res["status"])
      {
        this.newImage = res["imageUrl"];
        this.memberData.imgUrl = this.newImage;
        this.showImage = true;
        // console.log(this.newImage);
        this.toast.info("Image uploaded successfully");
      }
      else{
        // this.spinner.hide();
        this.toast.error(res["message"]);
      }
      this.spinner.hide();
    })    
  }

  addMemberDetails(form:NgForm)
  {
    form.value.id = this.memberData.id;
    form.value.imgUrl = this.memberData.imgUrl;
    // console.log(form.value);
    this.toast.success("Member Saved Successfully");
    this.studioService.filter({type:"member",data:form.value});
    this.closeModel(false);
  }

  closeModel(isConfirm)
  {
    if(isConfirm)
    {
      var leavePage = window.confirm("Do you want to go back? All the added information will be removed");
      console.log(leavePage);
      if(leavePage)
      {
        this.dialogRef.close();
        this.studioService.filter("Added");
      }
    }
    else{
      this.dialogRef.close();
      this.studioService.filter("Added");
    } 
  }

}
