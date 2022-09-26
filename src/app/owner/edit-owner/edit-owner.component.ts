import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OwnerService } from 'src/app/services/owner.service';
import { StudioService } from 'src/app/services/studio.service';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css']
})
export class EditOwnerComponent implements OnInit {

  ownerId;
  ownerDetails;

  defaultStudio = "-1";

  allStudios = [];

  constructor(
    private ownerService:OwnerService,
    private studioService:StudioService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService,
    private routerBtn:Router,
    private route:ActivatedRoute
  )
  {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(resParams=>{
      this.ownerId = resParams['ownerId'];
      this.ownerService.getSingleOwner(this.ownerId).subscribe(resOwner=>{
        if(resOwner["status"])
        {
          this.ownerDetails = resOwner["owner"];
        }
        this.studioService.getAllStudios().subscribe(res=>{
          if(res["status"])
          {
            this.allStudios = res["studios"];
          }
          this.spinner.hide();
        });
      });
    });
  }

  onStudioSelect(studioId)
  {

  }

  onSubmit(form:NgForm)
  {
    console.log(form.value);
    this.ownerService.editSingleOwner(this.ownerId,form.value).subscribe(res=>{
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
