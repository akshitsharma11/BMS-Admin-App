import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { AddRoomInfoComponent } from './add-room-info/add-room-info.component';

@Component({
  selector: 'app-create-studio',
  templateUrl: './create-studio.component.html',
  styleUrls: ['./create-studio.component.css']
})
export class CreateStudioComponent implements OnInit {

  defaultRoomsCount = "-1";
  defaultMaxGuestsCount = "-1";

  allRooms = [{roomId:1}];
  allAmenities = [{id:1, name:"Wi-fi"},{id:2, name:"Ableton DAW"},{id:3, name:"Pro tools DAW"},{id:4, name:"Electric Guitar"},
                  {id:5, name:"AC"},{id:6, name:"Piano"}];
  selectedAmenities = [];
  roomData = [];

  imageFileName = "";
  videoFileNames = [];

  constructor(    
    public matDialog:MatDialog
  )
  {

  }

  ngOnInit(): void {
  }

  onRoomsSelect(value)
  {
    // console.log(value);
    for(let i=2;i<=(+value);i++)
    {
      const index = this.allRooms.findIndex(a=>a.roomId==i);
      if(index==-1)
      {
        this.allRooms.push({roomId:i});
      }
    }
  }

  addRoomDetails(roomDetails:any)
  {
    // console.log(roomDetails);
    //Open popup model
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'add-signature-dish-component';
    // dialogConfig.height = "395px";
    dialogConfig.width = "585px";
    dialogConfig.maxHeight = '95vh';

    //For styling the mat-dialog (like borderRadius)
    dialogConfig.panelClass = 'custom-container1'; //Now, we have style this class in global styles.css

    //passing data
    dialogConfig.data = {roomDetails:roomDetails};

    const modalDialog = this.matDialog.open(AddRoomInfoComponent,dialogConfig);
  }

  data(e, amenityData: any)
  {
    // console.log(e.target.defaultValue,e.target.checked,amenityData);
    if(e.target.checked)
    {
      this.selectedAmenities.push(amenityData);
    }
    else{
      const index = this.selectedAmenities.findIndex(i=>i.id==amenityData.id);
      if(index!=-1)
      {
        this.selectedAmenities.splice(index,1);
      }
    }
    console.log(this.selectedAmenities);
  }

  selectVideos(event)
  {
    // this.uploadText = "Uploading Video(s)";

    // this.spinner.show();
    // console.log(event.target.files.length);
    // if(event.target.files.length>2)
    // {
    //   this.spinner.hide();
    //   this.toast.error("Max. of 2 Videos could be uploaded","Error Occured",{
    //     timeOut:2500,
    //     progressBar:true,
    //     progressAnimation:'increasing',
    //     positionClass:'toast-top-right'
    //   }) 
    // }
    // else{
    //   for  (var i =  0; i <  event.target.files.length; i++)  {  
    //     if(event.target.files[i].type=="video/mp4")
    //     {
    //       // console.log(event.target.files[i].name);
    //       this.shortVideos.push(event.target.files[i]);
    //       this.videoFileNames = this.videoFileNames.concat(event.target.files[i].name);
    //     }
    //     else{
    //       this.spinner.hide();
    //       this.toast.error("Please upload video file","Error Occured",{
    //         timeOut:2500,
    //         progressBar:true,
    //         progressAnimation:'increasing',
    //         positionClass:'toast-top-right'
    //       }) 
    //     }
    //   }
    // }    
    
    // const formData = new FormData();
    // for  (var i =  0; i <  this.shortVideos.length; i++)  {  
    //   formData.append("newImages",  this.shortVideos[i]);
    // } 

    // this.courseService.uploadMultipleFiles(formData).subscribe(res=>{
    //   if(res["status"])
    //   {
    //     this.shortVideos = res["images"];
    //     this.spinner.hide();
    //     console.log("Short Videos : ",this.shortVideos);
    //     this.toast.info("Media Files uploaded successfully","",{
    //       timeOut:2500,
    //       progressBar:true,
    //       progressAnimation:'increasing',
    //       positionClass:'toast-top-right'
    //     });

    //   }else{
    //     this.spinner.hide();
    //     this.toast.error(res["message"],"Error Occured",{
    //       timeOut:2500,
    //       progressBar:true,
    //       progressAnimation:'increasing',
    //       positionClass:'toast-top-right'
    //     })
    //   }
    // },err=>{
    //   this.spinner.hide();
    //   this.toast.error(err,"Error Occured",{
    //     timeOut:2500,
    //     progressBar:true,
    //     progressAnimation:'increasing',
    //     positionClass:'toast-top-right'
    //   })
    // })
  }

  onSubmit(form:NgForm)
  {
    let studioData = {
      fullName : form.value.fullName,
      address:form.value.address,
      latitude:"",
      longitude:"",
      city:form.value.city,
      state:form.value.state,
      area : form.value.area,
      pincode:form.value.pincode,
      pricePerHour:0,
      availabilities:[],
      amenities:this.selectedAmenities,
      totalRooms:form.value.totalRooms,
      roomsDetails : [],
      maxGuests:form.value.maxGuests,
      studioPhotos:[],
      aboutUs:{
        aboutUs:form.value.aboutStudio,
        services:form.value.studioServices,
        infrastructure:form.value.infrastructure
      },
      teamDetails:[],
      clientPhotos:[]
    };
    console.log(studioData);
  }

}
