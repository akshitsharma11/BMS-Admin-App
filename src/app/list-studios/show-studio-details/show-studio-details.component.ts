import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-studio-details',
  templateUrl: './show-studio-details.component.html',
  styleUrls: ['./show-studio-details.component.css']
})
export class ShowStudioDetailsComponent implements OnInit {

  studioData;

  constructor(
    public dialogRef:MatDialogRef<ShowStudioDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.studioData = data.studioData;
    this.studioData.mappedAmenities = data.studioData.amenities.map(a=>a.name).join(', ');
    this.studioData.roomsDetails.forEach(singleRoom=>{
      singleRoom.mappedAvailabilities = singleRoom.availabilities.map(a=>a.startTime+"-"+a.endTime).join(', ');
      singleRoom.mappedAmenities = singleRoom.amenities.map(a=>a.name).join(', ');
    });
    console.log(this.studioData);
  }

  ngOnInit(): void {
  }

  closeModel()
  {
    this.dialogRef.close();
  }

}
