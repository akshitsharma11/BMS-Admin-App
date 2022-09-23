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
  dummyTransactions = [];

  filteredStatus = '';  
  p:number =1;
  
  startDate = '';
  endDate = '';
  showSearchIcon = true;

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
    //Fetching all transactions
    this.transactionService.getAllTransactions().subscribe(res=>{
      this.allTransactions = res["transactions"];
      this.allTransactions.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
      this.dummyTransactions = this.allTransactions;
      // console.log(this.allTransactions);
      this.spinner.hide();
    });
  }

  searchByDate()
  {
    console.log(this.startDate,this.endDate);
    if(this.startDate=="" || this.endDate=="")
    {
      this.toast.error("Select Valid Date");
    }
    else{
      this.spinner.show();
      this.showSearchIcon = false;
      this.transactionService.getAllTransactionsByDateRange({startDate:this.startDate,endDate:this.endDate}).subscribe(res=>{
        this.allTransactions = res["transactions"];
        this.allTransactions.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
        // console.log(this.allTransactions);
        this.spinner.hide();
      })
    }
  }

  removeDateSearchedList()
  {
    this.allTransactions = this.dummyTransactions;
    this.startDate = "";
    this.endDate = "";
    this.showSearchIcon = true;
    console.log(this.allTransactions.length);
  }

}
