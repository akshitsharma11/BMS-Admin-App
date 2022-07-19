import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  userDetails;

  constructor(private routerBtn:Router,public dialogRef:MatDialogRef<ShowDetailsComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.userDetails = data.user;
    this.userDetails.phone = this.userDetails.phone.replace("_","");
    console.log(this.userDetails);
  }

  ngOnInit(): void {
  }

  closeModel()
  {
    this.dialogRef.close();
  }

  showUserTopics(userId)
  {
    this.routerBtn.navigate(['/admin/user-topics/'+userId]);
    this.closeModel();
  }

}
