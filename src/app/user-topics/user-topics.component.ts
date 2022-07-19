import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateNewTopicComponent } from '../create-new-topic/create-new-topic.component';
import { EditTopicComponent } from '../edit-topic/edit-topic.component';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-user-topics',
  templateUrl: './user-topics.component.html',
  styleUrls: ['./user-topics.component.css']
})
export class UserTopicsComponent implements OnInit {

  userId;
  allTopics = [];

  filteredStatus = '';
  p:number =1;

  constructor(private route:ActivatedRoute,public matDialog:MatDialog,private topicService:TopicService,private spinner:NgxSpinnerService)
  {
    this.spinner.show();
    this.topicService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.spinner.show();

    this.route.params.subscribe(Params=>{
      this.userId = +Params["userId"];
      this.topicService.getAllTopics().subscribe(res=>{
        this.allTopics = res["allTopics"];
        //filter topics
        this.allTopics = this.allTopics.filter(i=>i.creatorType==1 && i.creatorId==this.userId);
        console.log(this.allTopics);
        this.spinner.hide();
      });
    });

  }

  toggle(event: MatSlideToggleChange,productId)
  {
    console.log('Toggle fired',event.checked);
    // this.productsService.toggleProductPopularity(productId).subscribe(res=>{
    //   if(res["status"])
    //   {
    //     this.toast.info(res["message"],"Success",{
    //       timeOut:2500,
    //       progressBar:true,
    //       progressAnimation:'increasing',
    //       positionClass:'toast-top-right'
    //     });

    //   }else{
    //     this.toast.error(res["message"],"Error Occured",{
    //       timeOut:2500,
    //       progressBar:true,
    //       progressAnimation:'increasing',
    //       positionClass:'toast-top-right'
    //     })
    //   }
    // })
  }


}
