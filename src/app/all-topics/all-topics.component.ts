import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreateNewTopicComponent } from '../create-new-topic/create-new-topic.component';
import { EditTopicComponent } from '../edit-topic/edit-topic.component';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-all-topics',
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css']
})
export class AllTopicsComponent implements OnInit {

  allTopics = [];

  filteredStatus = '';
  p:number =1;

  showAdminTopics = 1;

  constructor(public matDialog:MatDialog,private topicService:TopicService,private spinner:NgxSpinnerService,private toast:ToastrService)
  {
    this.spinner.show();
    this.topicService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.showOnlyAdminTopics();
  }

  showOnlyAdminTopics()
  { 
    this.showAdminTopics = 1;
    this.topicService.getAllTopics().subscribe(res=>{
      this.allTopics = res["allTopics"].filter(i=>i.creatorType==0);
      // console.log(this.allTopics);
      this.spinner.hide();
    });
  }

  showOnlyUserTopics()
  { 
    this.showAdminTopics = 0;
    this.topicService.getAllTopics().subscribe(res=>{
      this.allTopics = res["allTopics"].filter(i=>i.creatorType==1);
      // console.log(this.allTopics);
      this.spinner.hide();
    });
  }

  toggle(event: MatSlideToggleChange,topicId)
  {
    console.log('Toggle fired',event.checked);
    this.topicService.toggleDefaultTopic(topicId,{}).subscribe(res=>{
      if(res["status"])
      {
        this.toast.info(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });

      }else{
        this.toast.error(res["message"],"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    });
  }

  openCreateDialog()
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = 'create-topic-component';
    dialogConfig.height = "350px";
    dialogConfig.width = "480px";
    
    const modalDialog = this.matDialog.open(CreateNewTopicComponent,dialogConfig);
  }

  openEditDialog(topic)
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = 'edit-topic-component';
    dialogConfig.height = "350px";
    dialogConfig.width = "480px";
    //passing data
    dialogConfig.data = {topic:topic};

    const modalDialog = this.matDialog.open(EditTopicComponent,dialogConfig);
  }

}
