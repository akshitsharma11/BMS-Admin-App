import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { ActivatedRoute } from '@angular/router';
import { StudioService } from 'src/app/services/studio.service';
import { MemberDetailsComponent } from '../member-details/member-details.component';
import { RoomDetailsComponent } from '../room-details/room-details.component';

@Component({
  selector: 'app-view-studio-details',
  templateUrl: './view-studio-details.component.html',
  styleUrls: ['./view-studio-details.component.css']
})
export class ViewStudioDetailsComponent implements OnInit {

  studioId;
  studioDetails;

  constructor(
    public matDialog:MatDialog,
    private route:ActivatedRoute,
    private studioService:StudioService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(Params=>{
      this.studioId = Params['studioId'];
      this.studioService.getSingleStudio(this.studioId).subscribe(res=>{
        if(res["status"])
        {
          this.studioDetails = res["studio"];
        }
        console.log(this.studioDetails);
      });
    });
  }

  showRoomDetails(roomData)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'room-details-component';
    // dialogConfig.height = "420px";
    dialogConfig.width = "550px";
    dialogConfig.maxHeight = '95vh';
    
    //For styling the mat-dialog (like borderRadius)
    dialogConfig.panelClass = 'custom-container1'; //Now, we have style this class in global styles.css

    //passing data
    dialogConfig.data = {roomData:roomData};
    
    const modalDialog = this.matDialog.open(RoomDetailsComponent,dialogConfig);
  }

  showMemberDetails(memberData)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'member-details-component';
    // dialogConfig.height = "420px";
    dialogConfig.width = "520px";
    dialogConfig.maxHeight = '95vh';
    
    //For styling the mat-dialog (like borderRadius)
    dialogConfig.panelClass = 'custom-container1'; //Now, we have style this class in global styles.css

    //passing data
    dialogConfig.data = {memberData:memberData};
    
    const modalDialog = this.matDialog.open(MemberDetailsComponent,dialogConfig);
  }

}
