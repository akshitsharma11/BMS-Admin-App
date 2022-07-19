import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-all-feedbacks',
  templateUrl: './all-feedbacks.component.html',
  styleUrls: ['./all-feedbacks.component.css']
})
export class AllFeedbacksComponent implements OnInit {

  allFeedbacks = [];

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
    this.feedbackService.getAllFeedbacks().subscribe(res=>{
      this.allFeedbacks = res["feedbacks"];
      //Remove user where userData not exists
      this.allFeedbacks = this.allFeedbacks.filter(i=>i.userData!=null);
      // console.log(this.allFeedbacks);
      this.spinner.hide();
    });
  }

}
