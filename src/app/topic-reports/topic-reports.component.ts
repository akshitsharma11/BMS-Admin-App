import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from '../services/feedback.service';
import { TopicDetailsComponent } from '../topic-details/topic-details.component';

@Component({
  selector: 'app-topic-reports',
  templateUrl: './topic-reports.component.html',
  styleUrls: ['./topic-reports.component.css']
})
export class TopicReportsComponent implements OnInit {

  allTopicReports = [];

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
    this.feedbackService.getAllTopicReports().subscribe(res=>{
      this.allTopicReports = res["reports"];
      this.allTopicReports.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
      console.log(this.allTopicReports);
      this.spinner.hide();
    });
  }

  showTopicDetails(topicData)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'topic-details-component';
    dialogConfig.height = "340px";
    dialogConfig.width = "460px";
    //passing data
    dialogConfig.data = {topicData:topicData}
    
    const modalDialog = this.matDialog.open(TopicDetailsComponent,dialogConfig);   
  }

}
