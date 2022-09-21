import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StudioService } from '../services/studio.service';
import { ShowStudioDetailsComponent } from './show-studio-details/show-studio-details.component';

@Component({
  selector: 'app-list-studios',
  templateUrl: './list-studios.component.html',
  styleUrls: ['./list-studios.component.css']
})
export class ListStudiosComponent implements OnInit {

  allStudios = [];
  dummyStudios = [];

  filteredStatus = '';  
  p:number =1;
  
  startDate = '';
  endDate = '';
  showSearchIcon = true;

  constructor(
    public matDialog:MatDialog,
    private studioService:StudioService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService,
    private routerBtn:Router
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
      this.allStudios.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
      this.dummyStudios = this.allStudios;
      // console.log(this.allStudios);
      this.spinner.hide();
    });
  }

  showDetailsDialog(studioData)
  {
    this.routerBtn.navigate([]).then(result => {  window.open('/admin/studios/'+studioData._id, '_blank'); });
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.id = 'show-studio-details-component';
    // // dialogConfig.height = "420px";
    // dialogConfig.width = "550px";
    // dialogConfig.maxHeight = '95vh';
    
    // //For styling the mat-dialog (like borderRadius)
    // dialogConfig.panelClass = 'custom-container1'; //Now, we have style this class in global styles.css

    // //passing data
    // dialogConfig.data = {studioData:studioData};
    
    // const modalDialog = this.matDialog.open(ShowStudioDetailsComponent,dialogConfig);
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

  searchByDate()
  {
    console.log(this.startDate,this.endDate);
    if(this.startDate=="")
    {
      this.toast.error("Select Valid Date");
    }
    else{
      this.spinner.show();
      this.showSearchIcon = false;
      this.studioService.getAllStudiosByDate({creationDate:this.startDate}).subscribe(res=>{
        this.allStudios = res["studios"];
        // console.log(this.allStudios);
        this.spinner.hide();
      })
    }
  }

  removeDateSearchedList()
  {
    this.allStudios = this.dummyStudios;
    this.startDate = "";
    this.endDate = "";
    this.showSearchIcon = true;
    console.log(this.allStudios.length);
  }

}
