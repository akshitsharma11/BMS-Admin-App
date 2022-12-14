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

  allRoomPhotos = [];

  newImage:any;
  signupForm:FormGroup;
  
  //For iterating array of objects in Reactive form
  availControl;
  private availModel = {startTime:[], endTime: ['']};

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
    this.allRoomPhotos = this.roomDetails.roomPhotos;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'roomId':new FormControl('',[Validators.required]),
      'roomName' : new FormControl(null, [Validators.required]),
      'area' : new FormControl(null, [Validators.required]),
      'details':new FormArray([]),
      'amenities':new FormArray([]),
      'basePrice' : new FormControl('', [Validators.required]),
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
    // console.log(this.roomDetails.availabilities);
    if(this.roomDetails.availabilities.length==0)
    {
      this.patchTime();
    }

    this.signupForm.patchValue({
      roomId : this.roomDetails.roomId,
      roomName : this.roomDetails.roomName,
      area : this.roomDetails.area,
      basePrice : this.roomDetails.basePrice,
      discountPercentage : this.roomDetails.discountPercentage,
      generalStartTime : this.roomDetails.generalStartTime,
      generalEndTime : this.roomDetails.generalEndTime,
    });

    this.patchDetails();
    this.patchAmenities();
    this.patchAvailabilities();
    this.selectedDayList = this.roomDetails.bookingDays;
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
        console.log("Removed");
        this.selectedDayList.splice(index,1);
      }
    }
    console.log(this.selectedDayList);
  }

  selectImages(event:any)
  {  
    this.spinner.show();
    console.log(event.target.files.length);    
    let allRoomPhotosForm = [];

    for  (var i =  0; i <  event.target.files.length; i++)  {
        allRoomPhotosForm.push(event.target.files[i]);
    }
    
    const formData = new FormData();
    for  (var i =  0; i <  allRoomPhotosForm.length; i++)  {  
      formData.append("newImages",  allRoomPhotosForm[i]);
    } 

    this.studioService.uploadMultipleImages(formData).subscribe(res=>{
      if(res["status"])
      {
        // this.allRoomPhotos = res["images"];
        res["images"].forEach(singleImg=>{
          this.allRoomPhotos.push(singleImg);
        })
        this.roomDetails.roomPhotos = this.allRoomPhotos;
        this.spinner.hide();
        console.log("All Images : ",this.allRoomPhotos);
        this.toast.info("Media Files uploaded successfully","",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });

      }else{
        this.spinner.hide();
        this.toast.error(res["message"],"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    },err=>{
      this.spinner.hide();
      this.toast.error(err,"Error Occured",{
        timeOut:2500,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    })  
  }

  removeRoomPhoto(imgUrl)
  {
    const index = this.allRoomPhotos.findIndex(i=>i==imgUrl);
    if(index!=-1)
    {
      this.allRoomPhotos.splice(index,1);
    }
    console.log(this.allRoomPhotos);
  }

  isDaySelected(dayData)
  {
    const index = this.roomDetails.bookingDays.findIndex(i=>i.id==dayData.id);
    if(index!=-1)
    {
      //add in "selectedDayList" array also if already not present
      // const indexSelectedList = this.selectedDayList.findIndex(j=>j.id==dayData.id);
      // if(indexSelectedList==-1)
      // {
      //   this.selectedDayList.push(dayData);
      // }
      return true;
    }
    else{
      // //remove from "selectedDayList" array also if already present
      // const indexSelectedList = this.selectedDayList.findIndex(j=>j.id==dayData.id);
      // if(indexSelectedList!=-1)
      // {
      //   this.selectedDayList.splice(indexSelectedList,1);
      // }
      return false;
    }
  }

  onSubmit()
  {
    this.signupForm.value.generalTime = {startTime:this.signupForm.value.generalStartTime,endTime:this.signupForm.value.generalEndTime};
    this.signupForm.value.roomPhotos = this.roomDetails.roomPhotos;
    this.signupForm.value.bookingDays = this.selectedDayList;
    this.signupForm.value.pricePerHour = (this.signupForm.value.basePrice) - ((this.signupForm.value.basePrice)*(this.signupForm.value.discountPercentage/100));
    console.log(this.signupForm.value);
    if(this.signupForm.value.availabilities[0].startTime=="")
    {
      this.toast.error("Enter valid time for Availability");
    }
    else{
      this.toast.success("Room Saved Successfully");
      this.studioService.filter({type:"room",data:this.signupForm.value});
      this.closeModel(false);
    }
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
