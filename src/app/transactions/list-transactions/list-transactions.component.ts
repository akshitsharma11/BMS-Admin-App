import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  dummyTotalRecords = 0;
  totalRecords = 0;
  isDateFilter = false;

  filteredStatus = '';
  p: number = 1;

  startDate = '';
  endDate = '';
  showSearchIcon = true;

  constructor(
    public matDialog: MatDialog,
    private transactionService: TransactionService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private routerBtn: Router
  ) {
    this.transactionService.listen().subscribe((m: any) => {
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    //Fetching all transactions
    this.loadTransactions(this.p)
  }

  loadTransactions(e) {
    this.p = e;
    if(this.isDateFilter) {
      return;
    } else {
      this.spinner.show();
      let params = {
        skip: e == 1 ? 0 : (e - 1) * 20,
        limit: 20
      };
      this.transactionService.getAllTransactions(params).subscribe(res => {
        this.totalRecords = res["totalTransactions"];
        this.allTransactions = res["transactions"];
        this.allTransactions.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
        this.dummyTransactions = this.allTransactions;
        this.dummyTotalRecords = this.totalRecords;
        // console.log(this.allTransactions);
        this.spinner.hide();
      });
    }
  }

  onFilterTextChange() {
    console.log(this.allTransactions);
  }

  searchByDate() {
    if (this.startDate == "" || this.endDate == "") {
      this.toast.error("Select Valid Date");
    }
    else {
      this.spinner.show();
      this.showSearchIcon = false;
      this.transactionService.getAllTransactionsByDateRange({ startDate: this.startDate, endDate: this.endDate }).subscribe(res => {
        this.isDateFilter = true;
        this.allTransactions = res["transactions"];
        this.allTransactions.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
        this.totalRecords = this.allTransactions.length;
        // console.log(this.allTransactions);
        this.spinner.hide();
      })
    }
  }

  removeDateSearchedList() {
    this.isDateFilter = false;
    this.allTransactions = this.dummyTransactions;
    this.totalRecords = this.dummyTotalRecords;
    this.startDate = "";
    this.endDate = "";
    this.showSearchIcon = true;
  }

}
