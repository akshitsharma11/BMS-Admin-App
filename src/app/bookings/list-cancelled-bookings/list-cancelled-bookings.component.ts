import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-list-cancelled-bookings',
  templateUrl: './list-cancelled-bookings.component.html',
  styleUrls: ['./list-cancelled-bookings.component.css']
})
export class ListCancelledBookingsComponent implements OnInit {

  allCancelledBookings = [];
  dummyBookings = [];
  totalRecords = 0;
  dummyTotalRecords = 0;
  isDateFilter = false;

  filteredStatus = '';
  p: number = 1;

  startDate = '';
  endDate = '';
  showSearchIcon = true;

  constructor(
    public matDialog: MatDialog,
    private bookingService: BookingService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private routerBtn: Router
  ) {
    this.bookingService.listen().subscribe((m: any) => {
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loadBookings(this.p);
  }

  loadBookings(e) {
    this.p = e;
    if(this.isDateFilter) {
      return;
    } else {
      const params = {
        bookingType: 2,
        skip: e == 1 ? 0 : (e - 1) * 20,
        limit: 20
      };
      this.spinner.show();
      //Fetching all bookings
      this.bookingService.getActiveBookings(params).subscribe(res => {
        this.allCancelledBookings = res["data"];
        this.totalRecords = res["totalBookings"];
        this.allCancelledBookings.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
        this.allCancelledBookings.forEach(singleBooking => {
          singleBooking.mappedBookingTime = singleBooking.bookingTime.startTime + "-" + singleBooking.bookingTime.endTime;
        });
        this.dummyBookings = this.allCancelledBookings;
        this.dummyTotalRecords = this.totalRecords;
        this.spinner.hide();
      });
    }
  }

  searchByDate() {
    console.log(this.startDate, this.endDate);
    if (this.startDate == "" || this.endDate == "") {
      this.toast.error("Select Valid Date");
    }
    else {
      this.spinner.show();
      this.showSearchIcon = false;
      this.bookingService.getAllBookingsByDateRange({ startDate: this.startDate, endDate: this.endDate }).subscribe(res => {
        // res["transactions"] = res["transactions"].filter(i=>{
        //   console.log(new Date(i.creationTimeStamp).getDate(),this.endDate.split('-')[2]);
        //   if(new Date(i.creationTimeStamp).getDate()>+this.endDate.split('-')[2])
        //   {
        //     return false;
        //   }
        //   else{
        //     return true;
        //   }
        // });
        this.allCancelledBookings = res["cancelledBookings"];
        this.allCancelledBookings.sort((a, b) => a.creationTimeStamp >= b.creationTimeStamp ? -1 : 1);
        this.allCancelledBookings.forEach(singleBooking => {
          singleBooking.mappedBookingTime = singleBooking.bookingTime.startTime + "-" + singleBooking.bookingTime.endTime;
          this.totalRecords = this.allCancelledBookings.length;
        });
        // console.log(this.allCancelledBookings);
        this.spinner.hide();
      })
    }
  }

  removeDateSearchedList() {
    this.isDateFilter = false;
    this.allCancelledBookings = this.dummyBookings;
    this.totalRecords = this.dummyTotalRecords;
    this.startDate = "";
    this.endDate = "";
    this.showSearchIcon = true;
  }

}
