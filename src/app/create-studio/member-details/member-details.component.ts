import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  memberData;
  
  constructor(    
    public dialogRef:MatDialogRef<MemberDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  )
  {    
    this.memberData = data.memberData;
    console.log(this.memberData);
  }

  ngOnInit(): void {
  }

}
