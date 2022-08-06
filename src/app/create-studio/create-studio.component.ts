import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { AddRoomInfoComponent } from './add-room-info/add-room-info.component';
import { StudioService } from '../services/studio.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';
import { HostListener } from '@angular/core';
import {LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-create-studio',
  templateUrl: './create-studio.component.html',
  styleUrls: ['./create-studio.component.css']
})
export class CreateStudioComponent implements OnInit {

  defaultRoomsCount = "-1";
  defaultMaxGuestsCount = "-1";

  allRooms = [{roomId:1,roomName:"",area:"",details:[],roomPhotos:[],amenities:[],pricePerHour:[],discountPercentage:"",
              generalStartTime:"",generalEndTime:"",availabilities:[],bookingDays:[]}];

  allAmenities = [{id:"1", name:"Wi-fi"},{id:"2", name:"Ableton DAW"},{id:"3", name:"Pro tools DAW"},{id:"4", name:"Electric Guitar"},
                  {id:"5", name:"AC"},{id:"6", name:"Piano"},{id:"7", name:"Fistudio DAW"},{id:"8", name:"Logic pro X Daw"},
                  {id:"9", name:"Guitar"},{id:"10", name:"Voilin"},{id:"11", name:"Drum"},{id:"12", name:"Cubase DAW"},
                  {id:"13", name:"AKG Microphone"}];
  selectedAmenities = [];

  allMembers = [{id:1, name:"",designation:"",imgUrl:""},{id:2, name:"",designation:"",imgUrl:""}];
  
  roomData = [];

  imageFileName = "";
  allStudioPhotos = [];
  studioPhotoNames = [];

  constructor(    
    public matDialog:MatDialog,
    private studioService:StudioService,
    private toast:ToastrService,
    private spinner:NgxSpinnerService,
    private routerBtn:Router,
    private Location: LocationStrategy
  )
  {

    this.studioService.listen().subscribe((m:any)=>{
      // console.log(m);
      if(m.type!=undefined)
      {
        if(m.type=="room")
        {
          let allRooms = [];
          // console.log("Room : ",m.data);
          // this.roomData.push(m.data);
          if(sessionStorage.getItem('allRooms')!=null)
          {
            allRooms = JSON.parse(sessionStorage.getItem('allRooms'));
            console.log(allRooms); 
            const index = allRooms.findIndex(i=>i.roomId==m.data.roomId);
            if(index!=-1)   //if this room details already exists
            {
              //first delete old record , then insert again
              allRooms.splice(index,1);
            }
          }
          allRooms.push(m.data);
          sessionStorage.setItem('allRooms',JSON.stringify(allRooms));
        }

        if(m.type=="member")
        {
          let allTeamMembers = [];
          if(sessionStorage.getItem('allMembers')!=null)
          {
            allTeamMembers = JSON.parse(sessionStorage.getItem('allMembers'));
            console.log(allTeamMembers); 
            const index = allTeamMembers.findIndex(i=>i.id==m.data.id);
            if(index!=-1)   //if this member details already exists
            {
              //first delete old record , then insert again
              allTeamMembers.splice(index,1);
            }
          }
          allTeamMembers.push(m.data);
          sessionStorage.setItem('allMembers',JSON.stringify(allTeamMembers));
        }
      }
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    console.log( window.location.href);
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function (event) {
        var leavePage = event.currentTarget.confirm("Do you want to go back? All the added information will be removed");
        console.log(leavePage);
        if(leavePage==true)
        {
          console.log("leave page");
          window.location.href = "admin/studios"
        }
        else{
          window.history.pushState(null, "", window.location.href);
        }
    };
  }

  getRoomButtonColor(roomData)
  {
    let allRooms = []
    if(sessionStorage.getItem('allRooms')!=null)
    {
      allRooms = JSON.parse(sessionStorage.getItem('allRooms'));
      const index = allRooms.findIndex(i=>i.roomId==roomData.roomId);
      if(index!=-1)
      {
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }

  getMemberButtonColor(memberData)
  {
    let allMemberInfo = []
    if(sessionStorage.getItem('allMembers')!=null)
    {
      allMemberInfo = JSON.parse(sessionStorage.getItem('allMembers'));
      const index = allMemberInfo.findIndex(i=>i.id==memberData.id);
      if(index!=-1)
      {
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }

  //Event for handling click of "Browser back button"
  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   // console.log(event);
  //   // alert('Back button pressed');
  //   var stayOnPage = event.currentTarget.confirm("Are you sure want to go back?");
  //   console.log(stayOnPage);
  //   if (!stayOnPage) { 
  //       event.preventDefault();
  //       window.history.forward();
  //       window.onunload = function () {null}
        
  //   history.pushState(null, document.title, location.href);
  //   // window.addEventListener('popstate', function (event)
  //   // {
  //   //   console.log("EVENT : ",event);
  //   //     history.pushState(null, document.title, location.href);
  //   // });
  //   }
  //   else{

  //   }
  // }

  onRoomsSelect(value)
  {
    this.allRooms = [{roomId:1,roomName:"",area:"",details:[],roomPhotos:[],amenities:[],pricePerHour:[],discountPercentage:"",
    generalStartTime:"",generalEndTime:"",availabilities:[],bookingDays:[]}];
    // console.log(value);
    for(let i=2;i<=(+value);i++)
    {
      const index = this.allRooms.findIndex(a=>a.roomId==i);
      if(index==-1)
      {
        this.allRooms.push({roomId:i,roomName:"",area:"",details:[],roomPhotos:[],amenities:[],pricePerHour:[],discountPercentage:"",
                            generalStartTime:"",generalEndTime:"",availabilities:[],bookingDays:[]});
      }
    }
  }

  addRoomDetails(roomDetails:any)
  {
    let roomInfo = roomDetails;
    // console.log(roomDetails);
    if(sessionStorage.getItem('allRooms')!=null)
    {
      let allRooms = JSON.parse(sessionStorage.getItem('allRooms'));
      // console.log(allRooms); 
      const index = allRooms.findIndex(i=>i.roomId==roomDetails.roomId);
      if(index!=-1)
      {
        roomInfo = allRooms[index];
      }
    }
    //Open popup model
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'add-room-info-component';
    // dialogConfig.height = "395px";
    dialogConfig.width = "645px";
    dialogConfig.maxHeight = '95vh';

    //For styling the mat-dialog (like borderRadius)
    dialogConfig.panelClass = 'custom-container1'; //Now, we have style this class in global styles.css

    //passing data
    dialogConfig.data = {roomDetails:roomInfo};

    const modalDialog = this.matDialog.open(AddRoomInfoComponent,dialogConfig);
  }

  addMemberDetails(memberData)
  {    
    let memberInfo = memberData;
    // console.log(roomDetails);
    if(sessionStorage.getItem('allMembers')!=null)
    {
      let allTeamMembers = JSON.parse(sessionStorage.getItem('allMembers'));
      // console.log(allTeamMembers); 
      const index = allTeamMembers.findIndex(i=>i.id==memberData.id);
      if(index!=-1)
      {
        memberInfo = allTeamMembers[index];
      }
    }
    //Open popup model
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'add-team-member-component';
    // dialogConfig.height = "395px";
    dialogConfig.width = "510px";
    dialogConfig.maxHeight = '95vh';

    //For styling the mat-dialog (like borderRadius)
    dialogConfig.panelClass = 'custom-container1'; //Now, we have style this class in global styles.css

    //passing data
    dialogConfig.data = {memberData:memberInfo};

    const modalDialog = this.matDialog.open(AddTeamMemberComponent,dialogConfig);
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

  addTeamMember()
  {
    let id = 1;
    if(this.allMembers.length!=0)
    {
      id = this.allMembers[this.allMembers.length-1].id + 1;
    }
    this.allMembers.push({id:id,name:"",designation:"",imgUrl:""});
    console.log(this.allMembers);
  }

  selectImages(event)
  {
    this.spinner.show();
    console.log(event.target.files.length);
    let allStudioPhotosForm = [];
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
      for  (var i =  0; i <  event.target.files.length; i++)  {
        // if(event.target.files[i].type=="jpeg/png")
        // {
          // console.log(event.target.files[i].name);
          allStudioPhotosForm.push(event.target.files[i]);
          this.studioPhotoNames = this.studioPhotoNames.concat(event.target.files[i].name);
        // }
        // else{
        //   this.spinner.hide();
        //   this.toast.error("Please upload video file","Error Occured",{
        //     timeOut:2500,
        //     progressBar:true,
        //     progressAnimation:'increasing',
        //     positionClass:'toast-top-right'
        //   })
        // }
      }
    // }
    
    const formData = new FormData();
    for  (var i =  0; i <  allStudioPhotosForm.length; i++)  {  
      formData.append("newImages",  allStudioPhotosForm[i]);
    } 

    this.studioService.uploadMultipleImages(formData).subscribe(res=>{
      if(res["status"])
      {
        // this.allStudioPhotos = res["images"];
        res["images"].forEach(singleImg=>{
          this.allStudioPhotos.push(singleImg);
        });
        this.spinner.hide();
        console.log("All Images : ",this.allStudioPhotos);
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

  removeStudioPhoto(imgUrl)
  {
    const index = this.allStudioPhotos.findIndex(i=>i==imgUrl);
    if(index!=-1)
    {
      this.allStudioPhotos.splice(index,1);
    }
    console.log(this.allStudioPhotos);
  }

  onSubmit(form:NgForm)
  {
    this.spinner.show();
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
      roomsDetails : (sessionStorage.getItem('allRooms')!=null)?(JSON.parse(sessionStorage.getItem('allRooms'))):[],
      maxGuests:form.value.maxGuests,
      studioPhotos:this.allStudioPhotos,
      aboutUs:{
        aboutUs:form.value.aboutStudio,
        services:form.value.studioServices,
        infrastructure:form.value.infrastructure
      },
      teamDetails:(sessionStorage.getItem('allMembers')!=null)?(JSON.parse(sessionStorage.getItem('allMembers'))):[],
      clientPhotos:[]
    };
    console.log(studioData);
        
    //Final team details
    let allRoomsData = [];
    for(let i=0;i<+form.value.totalRooms;i++)
    {
      allRoomsData.push(studioData.roomsDetails[i]);
    }
    studioData.roomsDetails = allRoomsData;

    let isRoomDetailsValid = true;
    console.log(studioData.roomsDetails.length);
    if(+studioData.totalRooms == studioData.roomsDetails.length)
    {
      studioData.roomsDetails.forEach(singleRoom=>{
        console.log("Room : ",singleRoom.roomName);
        if(singleRoom.roomName==undefined || singleRoom.roomName.length==0)
        {
          isRoomDetailsValid = false;
        }
      });
    }
    else{
      isRoomDetailsValid = false;
    }

    let isTeamDetailsValid = true;
    // if(this.allMembers.length==studioData.teamDetails.length)
    // {
      studioData.teamDetails.forEach(singleTeam=>{
        console.log("Team : ",singleTeam.name);
        if(singleTeam.name==undefined || singleTeam.name.length==0)
        {
          isTeamDetailsValid = false;
        }
      });
    // }
    // else{
    //   isTeamDetailsValid = false;
    // }

    if(!isRoomDetailsValid)
    {
      this.spinner.hide();
      this.toast.error("Enter valid room details");
    }
    else if(!isTeamDetailsValid)
    {
      this.spinner.hide();
      this.toast.error("Enter valid team details");
    }
    else{
      console.log("Create studio");
      this.studioService.createNewStudio(studioData).subscribe((res:any)=>{
        if(res["status"])
        {
          this.spinner.hide();
          //clear room and member info from sessions
          sessionStorage.removeItem('allRooms');
          sessionStorage.removeItem('allMembers');
          
          this.routerBtn.navigate(['/admin/studios']);
          this.toast.info(res["message"]);
        }
        else{
          this.spinner.hide();
          this.toast.error(res["message"]);
        }
      });
    }

  }

}
