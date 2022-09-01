import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
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

  filteredStatus = '';  
  p:number =1;

  constructor(
    public matDialog:MatDialog,
    private bookingService:BookingService,
    private spinner:NgxSpinnerService,
    private toast:ToastrService,
    private routerBtn:Router
  )
  {
    this.bookingService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {    
    this.spinner.show();
    //Fetching all bookings
    this.bookingService.getAllBookings().subscribe(res=>{
      this.allCancelledBookings = res["cancelledBookings"];
      this.allCancelledBookings.forEach(singleBooking=>{
        singleBooking.mappedBookingTime = singleBooking.bookingTime.startTime + "-" + singleBooking.bookingTime.endTime;
      });
      // console.log(this.allCancelledBookings);
      this.spinner.hide();
    });
  }

}
