import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OwnerService } from 'src/app/services/owner.service';
import { StudioService } from 'src/app/services/studio.service';

@Component({
  selector: 'app-create-owner',
  templateUrl: './create-owner.component.html',
  styleUrls: ['./create-owner.component.css']
})
export class CreateOwnerComponent implements OnInit {

  defaultStudio = "-1";

  allStudios = [];

  constructor(
    private ownerService:OwnerService,
    private studioService:StudioService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService,
    private routerBtn:Router
  )
  {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.studioService.getAllStudios().subscribe(res=>{
      if(res["status"])
      {
        this.allStudios = res["studios"];
      }
      this.spinner.hide();
    })
  }

  onStudioSelect(studioId)
  {

  }

  onSubmit(form:NgForm)
  {
    // console.log(form.value);
    this.ownerService.createNewOwner(form.value).subscribe(res=>{
      if(res["status"])
      {
        this.toast.info(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        this.routerBtn.navigate(['/admin/all-owners']);
      }
      else{
        this.toast.error(res["message"],"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    });
  }

}
