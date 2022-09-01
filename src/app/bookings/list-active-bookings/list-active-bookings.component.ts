import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-list-active-bookings',
  templateUrl: './list-active-bookings.component.html',
  styleUrls: ['./list-active-bookings.component.css']
})
export class ListActiveBookingsComponent implements OnInit {

  allActiveBookings = [];

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
      this.allActiveBookings = res["activeBookings"];
      this.allActiveBookings.forEach(singleBooking=>{
        singleBooking.mappedBookingTime = singleBooking.bookingTime.startTime + "-" + singleBooking.bookingTime.endTime;
      });
      // console.log(this.allActiveBookings);
      this.spinner.hide();
    });
  }

}
