import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-create-new-category',
  templateUrl: './create-new-category.component.html',
  styleUrls: ['./create-new-category.component.css']
})
export class CreateNewCategoryComponent implements OnInit {

  categoryName = "";
  categoryImageUrl = "";

  constructor(
    private toast:ToastrService,
    private spinnerService:NgxSpinnerService,
    private categoryService:CategoryService,
    private topicService:TopicService,
    public dialogRef:MatDialogRef<CreateNewCategoryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    
  }

  ngOnInit(): void {
  }

  createCategory()
  {
    console.log(this.categoryName);
    this.categoryService.postCategory({categoryName:this.categoryName, categoryImage:this.categoryImageUrl}).subscribe(res=>{
      if(res["status"])
      {
        this.toast.success(res["message"],"",{
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
    });
  }

  selectImage(event)
  {
    this.spinnerService.show();
    const file = event.target.files[0];
    console.log("Media File : ",file);

    const formData = new FormData();
    formData.append("newImage",file);

    this.topicService.uploadSingleImage(formData).subscribe(res=>{
      if(res["status"])
      {
        this.categoryImageUrl = res["imageUrl"];
        console.log("Topic Image : ",this.categoryImageUrl);
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
      this.spinnerService.hide();
    },err=>{
      this.spinnerService.hide();
      this.toast.error(err,"Error Occured",{
        timeOut:2500,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    })
  }

  closeModel()
  {
    this.dialogRef.close();
    this.categoryService.filter("Deleted");
  }

}
