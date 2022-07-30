import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  allDaysList = [{id:1, name:"Monday"},{id:2, name:"Tuesday"},{id:3, name:"Wednesday"},{id:4, name:"Thursday"},
                  {id:5, name:"Friday"},{id:6, name:"Saturday"},{id:7, name:"Sunday"}];
  selectedDayList = [];

  newImage:any;
  signupForm:FormGroup;
  
  //For iterating array of objects in Reactive form
  availControl;
  private availModel = {startTime:[], endTime: ['']} // the model, ready to hold the emails

  constructor(
  private fb:FormBuilder,
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
      'generalStartTime' : new FormControl('', [Validators.required]),
      'generalEndTime' : new FormControl('', [Validators.required]),
      'availabilities':new FormArray([]),
      // 'availabilities':new FormGroup({
      //   startTime:new FormControl('', [Validators.required]),
      //   endTime:new FormControl('', [Validators.required]),
      // }),
    });

    this.availControl = <FormArray>this.signupForm.controls['availabilities'];
    // this.patchStartTime();
    // this.patchTime();

    this.signupForm.patchValue({
      roomId : this.roomDetails.roomId,
      roomName : this.roomDetails.roomName,
      area : this.roomDetails.area,
      pricePerHour : this.roomDetails.pricePerHour,
      discountPercentage : this.roomDetails.discountPercentage,
      generalStartTime : this.roomDetails.generalStartTime,
      generalEndTime : this.roomDetails.generalEndTime,
    });

    this.patchDetails();
    this.patchAmenities();
    this.patchAvailabilities();

  }

  patchDetails()
  {
    let control = <FormArray>this.signupForm.controls.details;
    this.roomDetails.details.forEach(x => {
      control.push(this.fb.control(x));
    });
  }

  patchAmenities()
  {
    let control = <FormArray>this.signupForm.controls.amenities;
    this.roomDetails.amenities.forEach(x => {
      control.push(this.fb.control(x));
    });
  }

  patchAvailabilities()
  {
    // let control = <FormArray>this.signupForm.controls.availabilities;
    // this.roomDetails.availabilities.forEach(x => {
    //   control.push(this.fb.control(x));
    // });
    // this.availControl = [];
    this.roomDetails.availabilities.forEach((item) => {
      this.availControl.push(
          this.fb.group({
            endTime: [item.endTime, Validators.compose([])] ,
            startTime: [item.startTime, Validators.compose([])] 
          })
        );
    });
  }

  // private patchStartTime(): void {
  //   // iterate the object model and extra values, binding them to the controls
  //   this.availModel.startTime.forEach((item) => {
  //     this.availControl.push(this.patchStartTimeValues(item));
  //   })
  // }

  // private patchStartTimeValues(item) {
  //   return this.fb.group({
  //     startTime: [item, Validators.compose([])] 
  //   })
  // }

  private patchTime(): void {
    // iterate the object model and extra values, binding them to the controls
    this.availModel.endTime.forEach((item) => {
      this.availControl.push(this.patchTimeValues(item));
    })
  }

  private patchTimeValues(item) {
    return this.fb.group({
      endTime: [item, Validators.compose([])] ,
      startTime: [item, Validators.compose([])] 
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

  onAddAvailabilities()
  {
    const control = new FormControl(null, Validators.required);
      // typecasting into FormArray
    // (<FormArray>this.signupForm.get('availabilities')).push(control);
    // this.availModel["availabilities"].push("");
    // console.log(this.availModel);
    // this.patchStartTime();
    this.patchTime();
  }

  onRemoveAvailabilities(index)
  {
    (<FormArray>this.signupForm.get('availabilities')).removeAt(index);
  }

  getControlsAvailabilities() {
    return (<FormArray>this.signupForm.get('availabilities')).controls;
  }

  dataBookingDays(e, bDayData: any)
  {
    // console.log(e.target.defaultValue,e.target.checked,bDayData);
    if(e.target.checked)
    {
      this.selectedDayList.push(bDayData);
    }
    else{
      const index = this.selectedDayList.findIndex(i=>i.id==bDayData.id);
      if(index!=-1)
      {
        this.selectedDayList.splice(index,1);
      }
    }
    console.log(this.selectedDayList);
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
    this.signupForm.value.generalTime = {startTime:this.signupForm.value.generalStartTime,endTime:this.signupForm.value.generalEndTime};
    this.signupForm.value.roomPhotos = [];
    this.signupForm.value.bookingDays = this.selectedDayList;
    console.log(this.signupForm.value);
    // this.studioService.addSignatureDish(form.value).subscribe(res=>{
    //   if(res["status"])
    //   {
        this.toast.success("Room Saved Successfully");
        this.studioService.filter({type:"room",data:this.signupForm.value});
        this.closeModel();
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
