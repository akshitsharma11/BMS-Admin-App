import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-list-discount',
  templateUrl: './list-discount.component.html',
  styleUrls: ['./list-discount.component.css']
})
export class ListDiscountComponent implements OnInit {

  allDiscounts = [];

  filteredStatus = '';  
  p:number =1;

  constructor(
    public matDialog:MatDialog,
    private discountService:DiscountService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService,
    private routerBtn:Router
  )
  {
    this.discountService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {    
    this.spinner.show();
    //Fetching all Studios
    this.discountService.getAllDiscounts().subscribe(res=>{
      this.allDiscounts = res["discounts"];
      this.allDiscounts.forEach(singleDiscount=>{
        if(singleDiscount.discountType==0)
        {
          singleDiscount.discountTypeName = "User discount - First"
        }
        if(singleDiscount.discountType==1)
        {
          singleDiscount.discountTypeName = "User discount - Recurring"
        }
        if(singleDiscount.discountType==2)
        {
          singleDiscount.discountTypeName = "Event-based"
        }
        if(singleDiscount.discountType==3)
        {
          singleDiscount.discountTypeName = "Specific User"
        }
      });
      console.log(this.allDiscounts);
      this.spinner.hide();
    });
  }

}
