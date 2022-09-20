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
  dummyBookings = [];

  filteredStatus = '';  
  p:number =1;
  
  startDate = '';
  endDate = '';
  showSearchIcon = true;

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
      this.dummyBookings = this.allActiveBookings;
      // console.log(this.allActiveBookings);
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
      this.bookingService.getAllBookingsByDateRange({startDate:this.startDate,endDate:this.endDate}).subscribe(res=>{
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
        this.allActiveBookings = res["activeBookings"];
        // console.log(this.allActiveBookings);
        this.spinner.hide();
      })
    }
  }

  removeDateSearchedList()
  {
    this.allActiveBookings = this.dummyBookings;
    this.startDate = "";
    this.endDate = "";
    this.showSearchIcon = true;
    console.log(this.allActiveBookings.length);
  }

}
