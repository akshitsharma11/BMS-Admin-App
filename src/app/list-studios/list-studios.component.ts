import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StudioService } from '../services/studio.service';

@Component({
  selector: 'app-list-studios',
  templateUrl: './list-studios.component.html',
  styleUrls: ['./list-studios.component.css']
})
export class ListStudiosComponent implements OnInit {

  allStudios = [];

  filteredStatus = '';  
  p:number =1;

  constructor(
    public matDialog:MatDialog,
    private studioService:StudioService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService
  )
  {
    this.studioService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {    
    this.spinner.show();
    //Fetching all Studios
    this.studioService.getAllStudios().subscribe(res=>{
      this.allStudios = res["studios"];
      console.log(this.allStudios);
      this.spinner.hide();
    });
  }

  deleteStudioDialog(studioId)
  {
    // this.studioService.deleteSingleCategory(+studioId).subscribe(res=>{
    //   if(res["status"])
    //   {
    //     this.toast.success(res["message"],"",{
    //       timeOut:2500,
    //       progressBar:true,
    //       progressAnimation:'increasing',
    //       positionClass:'toast-top-right'
    //     });
    //     this.ngOnInit();
    //   }else{
    //     this.toast.error(res["message"],"Error Occured",{
    //       timeOut:2500,
    //       progressBar:true,
    //       progressAnimation:'increasing',
    //       positionClass:'toast-top-right'
    //     })
    //   }
    // },err=>{
    //   this.toast.error(err,"Error Occured",{
    //     timeOut:2500,
    //     progressBar:true,
    //     progressAnimation:'increasing',
    //     positionClass:'toast-top-right'
    //   })
    // });
  }

}
