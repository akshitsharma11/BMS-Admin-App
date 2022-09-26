import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SubadminService } from 'src/app/services/subadmin.service';
import { DeleteSubadminComponent } from '../delete-subadmin/delete-subadmin.component';

@Component({
  selector: 'app-list-subadmins',
  templateUrl: './list-subadmins.component.html',
  styleUrls: ['./list-subadmins.component.css']
})
export class ListSubadminsComponent implements OnInit {

  allSubAdmins = [];

  filteredStatus = '';  
  p:number =1;

  constructor(
    public matDialog:MatDialog,
    private subAdminService:SubadminService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService,
    private routerBtn:Router
  )
  {
    this.subAdminService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {    
    this.spinner.show();
    //Fetching all bookings
    this.subAdminService.getAllSubAdmins().subscribe(res=>{
      this.allSubAdmins = res["subAdmins"];
      this.allSubAdmins  = this.allSubAdmins.filter(i=>{
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
      this.allSubAdmins.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
      // console.log(this.allSubAdmins);
      this.spinner.hide();
    });
  }

  deleteSubAdminDialog(subAdminId)
  {
    const dialogConfig = new MatDialogConfig();
    //if the user clicks outside the modal, it doesn’t close
    dialogConfig.disableClose = false;
    dialogConfig.id = 'delete-subadmin-component';
    dialogConfig.height = "220px";
    dialogConfig.width = "510px";

    //For styling the mat-dialog (like borderRadius)
    dialogConfig.panelClass = 'custom-container'; //Now, we have style this class in global styles.css

    //passing data
    dialogConfig.data = {subAdminId:subAdminId};
    
    const modalDialog = this.matDialog.open(DeleteSubadminComponent,dialogConfig);
  }

}
