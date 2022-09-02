import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css']
})
export class ListTransactionsComponent implements OnInit {

  allTransactions = [];

  filteredStatus = '';  
  p:number =1;

  constructor(
    public matDialog:MatDialog,
    private transactionService:TransactionService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService,
    private routerBtn:Router
  )
  {
    this.transactionService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {    
    this.spinner.show();
    //Fetching all bookings
    this.transactionService.getAllTransactions().subscribe(res=>{
      this.allTransactions = res["transactions"];
      this.allTransactions.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
      // console.log(this.allTransactions);
      this.spinner.hide();
    });
  }

}
