import { Component, Inject, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';
import { NotificationService } from '../services/notification.service';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-create-new-topic',
  templateUrl: './create-new-topic.component.html',
  styleUrls: ['./create-new-topic.component.css']
})
export class CreateNewTopicComponent implements OnInit {

  adminId;

  topicImage = "";
  topicCategory = "-1";
  
  allCategories = [];

  constructor(private notificationService:NotificationService,private topicService:TopicService,private categoryService:CategoryService,public dialogRef:MatDialogRef<CreateNewTopicComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private toast:ToastrService)
  {

  }

  ngOnInit(): void {    
    this.adminId = +JSON.parse(localStorage.getItem('authUserData')).adminId;
    this.categoryService.getAllCategories().subscribe(res=>{
      this.allCategories = res["categories"];
    })
  }

  closeModel()
  {
    this.dialogRef.close();
    this.topicService.filter("Created");
  }

  selectImage(event)
  {
    const file = event.target.files[0];
    console.log("Media File : ",file);

    const formData = new FormData();
    formData.append("newImage",file);

    this.topicService.uploadSingleImage(formData).subscribe(res=>{
      if(res["status"])
      {
        this.topicImage = res["imageUrl"];
        console.log("Topic Image : ",this.topicImage);
        this.toast.info(res["message"],"",{
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
    },err=>{
      this.toast.error(err,"Error Occured",{
        timeOut:2500,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    })
  }

  onSubmit(form:NgForm)
  {
    //Get topicImage based on category
    const index = this.allCategories.findIndex(i=>i.categoryName.toLowerCase()==form.value.topicCategory.toLowerCase());
    if(index!=-1)
    {
      this.topicImage = this.allCategories[index].categoryImage;
    }

    const topicData = {
      topicName:form.value.topicName,
      topicIcon:this.topicImage,
      topicCategory:form.value.topicCategory,
      description:form.value.description,
      creatorType:0,
      creatorId:this.adminId
    };
    console.log(topicData);

    this.topicService.createNewTopic(topicData).subscribe(res=>{
      if(res["status"])
      {
        this.notificationService.sendNotificationsToAllUsers({title:"New Topic Added!!",message:form.value.topicName}).subscribe(resNoti=>{
          if(resNoti["status"])
          {
            this.toast.info(res["message"],"",{
              timeOut:2500,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass:'toast-top-right'
            });
            this.closeModel();
          }
          else{
            this.toast.error(resNoti["message"],"Error Occured",{
              timeOut:2500,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass:'toast-top-right'
            })
            this.closeModel();
          }
        },err=>{
          this.toast.error(err,"Error Occured",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          })
        })
      }else{
        this.toast.error(res["message"],"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    },err=>{
      this.toast.error(err,"Error Occured",{
        timeOut:2500,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    })
  }

}
