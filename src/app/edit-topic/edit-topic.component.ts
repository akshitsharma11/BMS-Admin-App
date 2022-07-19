import { Component, Inject, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit {

  topicDetails;
  topicImage = "";

  allCategories = [];

  constructor(private topicService:TopicService,private categoryService:CategoryService,public dialogRef:MatDialogRef<EditTopicComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private toast:ToastrService,private spinner:NgxSpinnerService)
  {
    this.topicDetails = data.topic;
    this.topicDetails.topicCategory = this.topicDetails.topicCategory.trim().toLowerCase();
    console.log(this.topicDetails);
  }

  ngOnInit(): void {
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
    // this.spinner.show();
    const file = event.target.files[0];
    console.log("Media File : ",file);

    const formData = new FormData();
    formData.append("newImage",file);

    this.topicService.uploadSingleImage(formData).subscribe(res=>{
      if(res["status"])
      {
        this.topicImage = res["imageUrl"];
        this.topicDetails.topicIcon = res["imageUrl"];
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
      // this.spinner.hide();
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
      this.topicDetails.topicIcon = this.allCategories[index].categoryImage;
    }
    console.log(this.topicDetails);

    this.topicService.editSingleTopic(this.topicDetails).subscribe(res=>{
      if(res["status"])
      {
        this.toast.info(res["message"],"",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        this.closeModel();
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
