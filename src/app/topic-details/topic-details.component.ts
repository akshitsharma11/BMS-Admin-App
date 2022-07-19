import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {

  topicData;

  constructor(public dialogRef:MatDialogRef<TopicDetailsComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.topicData = data.topicData;
    console.log(this.topicData);
  }

  ngOnInit(): void {
  }

  closeModel()
  {
    this.dialogRef.close();
  }

}
