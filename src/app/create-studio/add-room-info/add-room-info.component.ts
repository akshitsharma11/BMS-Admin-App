import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StudioService } from 'src/app/services/studio.service';

@Component({
  selector: 'app-add-room-info',
  templateUrl: './add-room-info.component.html',
  styleUrls: ['./add-room-info.component.css']
})
export class AddRoomInfoComponent implements OnInit {

  roomDetails;

  newImage:any;
  signupForm:FormGroup;

  constructor(
  private studioService:StudioService,
  private toast:ToastrService,
  private spinner:NgxSpinnerService,
  public dialogRef:MatDialogRef<AddRoomInfoComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.roomDetails = data.roomDetails;
    console.log(this.roomDetails);
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'roomId':new FormControl('',[Validators.required]),
      'roomName' : new FormControl(null, [Validators.required]),
      'area' : new FormControl(null, [Validators.required]),
      'details':new FormArray([]),
      'amenities':new FormArray([]),
      'pricePerHour' : new FormControl('', [Validators.required]),
      'discountPercentage' : new FormControl('', [Validators.required]),
    });

    this.signupForm.patchValue({
      roomId:this.roomDetails.roomId
    })

  }

  onAddDetails()
  {
    const control = new FormControl(null, Validators.required);
      // typecasting into FormArray
    (<FormArray>this.signupForm.get('details')).push(control);
  }

  onRemoveDetails(index)
  {
    (<FormArray>this.signupForm.get('details')).removeAt(index);
  }

  getControlsDetails() {
    return (<FormArray>this.signupForm.get('details')).controls;
  }

  onAddAmenities()
  {
    const control = new FormControl(null, Validators.required);
      // typecasting into FormArray
    (<FormArray>this.signupForm.get('amenities')).push(control);
  }

  onRemoveAmenities(index)
  {
    (<FormArray>this.signupForm.get('amenities')).removeAt(index);
  }

  getControlsAmenities() {
    return (<FormArray>this.signupForm.get('amenities')).controls;
  }

  selectImage(event:any)
  {
    // this.spinner.show();
    // const file = event.target.files[0];
    // this.newImage = file;
    // // console.log(this.newImage);

    // const formData = new FormData();
    // formData.append("newImage",this.newImage);
    // this.authHttpService.uploadSingleImage(formData).subscribe((res:any)=>{
    //   if(res["status"])
    //   {
    //     this.newImage = res["imageUrl"];
    //     // console.log(this.newImage);
    //     this.toast.info("Image uploaded successfully");
    //   }
    //   else{
    //     // this.spinner.hide();
    //     this.toast.error(res["message"]);
    //   }
    //   this.spinner.hide();
    // })    
  }

  onSubmit()
  {
    console.log(this.signupForm.value);
    // this.studioService.addSignatureDish(form.value).subscribe(res=>{
    //   if(res["status"])
    //   {
    //     this.toast.success(res["message"]);
    //     this.closeModel();
    //   }
    //   else{
    //     this.toast.error(res["message"]);
    //   }
    //   },err=>{
    //   console.log(err);
    //   this.toast.error(err.error["message"]);
    // });
  }

  closeModel()
  {
    this.dialogRef.close();
    this.studioService.filter("Added");
  }

}
