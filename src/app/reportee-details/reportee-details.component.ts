import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reportee-details',
  templateUrl: './reportee-details.component.html',
  styleUrls: ['./reportee-details.component.css']
})
export class ReporteeDetailsComponent implements OnInit {

  reporteeData;

  constructor(public dialogRef:MatDialogRef<ReporteeDetailsComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.reporteeData = data.reporteeData;
    this.reporteeData.phone = this.reporteeData.phone.replace("_","");
    console.log(this.reporteeData);
  }

  ngOnInit(): void {
  }

  closeModel()
  {
    this.dialogRef.close();
  }
  
}
