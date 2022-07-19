import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReporteeDetailsComponent } from '../reportee-details/reportee-details.component';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css']
})
export class UserReportsComponent implements OnInit {

  allUserReports = [];

  filteredStatus = '';  
  p:number =1;

  constructor(
    public matDialog:MatDialog,
    private feedbackService:FeedbackService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService
  )
  {

  }

  ngOnInit(): void {    
    this.spinner.show();
    //Fetching all Categories
    this.feedbackService.getAllUserReports().subscribe(res=>{
      this.allUserReports = res["reports"];
      this.allUserReports.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
      console.log(this.allUserReports);
      this.spinner.hide();
    });
  }

  showReporteeDetails(reporteeData)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'reportee-details-component';
    dialogConfig.height = "430px";
    dialogConfig.width = "500px";
    //passing data
    dialogConfig.data = {reporteeData:reporteeData}
    
    const modalDialog = this.matDialog.open(ReporteeDetailsComponent,dialogConfig);   
  }

}
