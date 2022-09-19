import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-list-owners',
  templateUrl: './list-owners.component.html',
  styleUrls: ['./list-owners.component.css']
})
export class ListOwnersComponent implements OnInit {

  allOwners = [];

  filteredStatus = '';  
  p:number =1;

  constructor(
    public matDialog:MatDialog,
    private ownerService:OwnerService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService,
    private routerBtn:Router
  )
  {
    this.ownerService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {    
    this.spinner.show();
    //Fetching all bookings
    this.ownerService.getAllOwners().subscribe(res=>{
      this.allOwners = res["owners"];
      this.allOwners  = this.allOwners.filter(i=>{
        if(JSON.parse(localStorage.getItem('authUserDataBMS')).email!=undefined)
        {
          if(JSON.parse(localStorage.getItem('authUserDataBMS')).email == i.email)
          {
            return false;
          }
          else{
            return true;
          }
        }
        else{
          return true;
        }
      })
      this.allOwners.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
      // console.log(this.allOwners);
      this.spinner.hide();
    });
  }

}
