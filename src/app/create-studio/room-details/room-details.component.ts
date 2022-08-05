import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  roomDetails;
  
  constructor(
    public dialogRef:MatDialogRef<RoomDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.roomDetails = data.roomData;
    this.roomDetails.mappedAvailabilities = this.roomDetails.availabilities.map(a=>a.startTime+"-"+a.endTime).join(', ');
    if(this.roomDetails.bookingDays!=undefined)
    {
      this.roomDetails.mappedBookingDays = this.roomDetails.bookingDays.map(a=>a.name).join(', ');
    }
    console.log(this.roomDetails);
  }

  ngOnInit(): void {
  }

}
