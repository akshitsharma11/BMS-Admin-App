import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreateNewCategoryComponent } from '../create-new-category/create-new-category.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  allCategories = [];

  filteredStatus = '';  
  p:number =1;

  constructor(
    public matDialog:MatDialog,
    private categoryService:CategoryService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService
  )
  {
    this.categoryService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {    
    this.spinner.show();
    //Fetching all Categories
    this.categoryService.getAllCategories().subscribe(res=>{
      this.allCategories = res["categories"];
      console.log(this.allCategories);
      this.spinner.hide();
    });
  }

  createNewCategoryDialog()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'create-category-component';
    dialogConfig.height = 'auto'
    dialogConfig.width = "620px";
    //passing data
    dialogConfig.data = {}
    
    const modalDialog = this.matDialog.open(CreateNewCategoryComponent,dialogConfig);   
  }

  deleteCategory(categoryId)
  {
    this.categoryService.deleteSingleCategory(+categoryId).subscribe(res=>{
      if(res["status"])
      {
        this.toast.success(res["message"],"",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        this.ngOnInit();
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
    });
  }

}
